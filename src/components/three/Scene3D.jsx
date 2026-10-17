import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Shared, mutable state read inside the render loop (no re-renders).
------------------------------------------------------------------- */
const pointer = { x: 0, y: 0 };
const scroll = { progress: 0, velocity: 0 };
const palette = { target: new THREE.Color('#F8D030') };

// Section id → Pokémon type colour the core shifts to while that section is on screen
const SECTION_COLORS = {
    hero: '#F8D030',
    about: '#F85888',
    skills: '#F08030',
    projects: '#7038F8',
    experience: '#C03028',
    education: '#78C850',
    publications: '#F85888',
    certifications: '#F8D030',
    achievements: '#F08030',
    contact: '#6890F0',
};

const SHARD_COLORS = ['#F08030', '#6890F0', '#78C850', '#F8D030', '#F85888', '#7038F8', '#98D8D8'];

// How far (world units) the camera travels down while the page scrolls top → bottom
const TRAVEL = 46;

function seeded(seed) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

/* ---------------- Camera rig: scroll dolly + mouse parallax ---------------- */
function CameraRig() {
    const { camera } = useThree();
    const look = useMemo(() => new THREE.Vector3(), []);
    useFrame((_, dt) => {
        const k = 1 - Math.pow(0.001, dt);
        const targetY = -scroll.progress * TRAVEL;
        camera.position.x += (pointer.x * 1.2 - camera.position.x) * k * 0.6;
        camera.position.y += (targetY + pointer.y * 0.8 - camera.position.y) * k;
        // slight barrel-roll when scrolling fast
        camera.rotation.z += (-scroll.velocity * 0.0009 - camera.rotation.z) * k;
        look.set(0, camera.position.y - pointer.y * 0.4, -6);
        camera.lookAt(look);
    });
    return null;
}

/* ---------------- Layered starfield that warps with scroll speed ---------------- */
function Starfield({ count, night }) {
    const groups = useRef([]);
    const layers = useMemo(() => {
        const rand = seeded(7);
        return [0, 1, 2].map((layer) => {
            const n = Math.floor(count / (layer + 1));
            const arr = new Float32Array(n * 3);
            for (let i = 0; i < n; i++) {
                arr[i * 3] = (rand() - 0.5) * 60;
                arr[i * 3 + 1] = (rand() - 0.5) * (TRAVEL + 50) - TRAVEL / 2;
                arr[i * 3 + 2] = -8 - layer * 10 - rand() * 12;
            }
            return { arr, size: 0.06 + layer * 0.03, speed: 0.01 + layer * 0.006 };
        });
    }, [count]);

    useFrame((state, dt) => {
        const warp = 1 + Math.min(Math.abs(scroll.velocity) * 0.004, 2.5);
        groups.current.forEach((g, i) => {
            if (!g) return;
            g.rotation.z += dt * layers[i].speed;
            g.scale.y = THREE.MathUtils.damp(g.scale.y, warp, 5, dt); // stretch stars into streaks on fast scroll
            g.position.y = state.camera.position.y * (0.15 * (i + 1));
        });
    });

    return layers.map((l, i) => (
        <points key={i} ref={(el) => (groups.current[i] = el)}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[l.arr, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={l.size}
                sizeAttenuation
                transparent
                depthWrite={false}
                color={night ? '#ffffff' : '#6b4fa8'}
                opacity={night ? 0.85 - i * 0.2 : 0.45 - i * 0.1}
                blending={night ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
        </points>
    ));
}

/* ---------------- The energy core: distorted orb + shell + orbit rings ---------------- */
function EnergyCore({ isMobile, night }) {
    const group = useRef();
    const orb = useRef();
    const mat = useRef();
    const shell = useRef();
    const rings = useRef([]);
    const moons = useRef([]);
    const light = useRef();
    const color = useMemo(() => new THREE.Color('#F8D030'), []);

    const ringDefs = useMemo(
        () => [
            { r: 2.15, tilt: [1.2, 0.2, 0], speed: 0.6 },
            { r: 2.55, tilt: [0.4, 1.1, 0.3], speed: -0.45 },
            { r: 2.95, tilt: [1.7, -0.6, 0.8], speed: 0.32 },
        ],
        []
    );

    useFrame((state, dt) => {
        const t = state.clock.elapsedTime;
        const p = scroll.progress;
        color.lerp(palette.target, 1 - Math.exp(-2.5 * dt));

        if (mat.current) {
            mat.current.color.copy(color);
            mat.current.emissive.copy(color).multiplyScalar(night ? 0.28 : 0.18);
            mat.current.distort = 0.24 + Math.sin(t * 0.8) * 0.06 + Math.min(Math.abs(scroll.velocity) * 0.002, 0.25);
        }
        if (light.current) light.current.color.copy(color);

        if (group.current) {
            // Path: starts right of the hero text, then weaves left/right behind content
            const heroX = isMobile ? 0 : 3.3;
            const weave = Math.sin(p * Math.PI * 4) * (isMobile ? 1.2 : 4.2);
            const x = p < 0.08 ? THREE.MathUtils.lerp(heroX, weave, p / 0.08) : weave;
            const camY = state.camera.position.y;
            group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x, 3.5, dt);
            group.current.position.y = camY + (isMobile ? 2.6 : 0) * (1 - Math.min(p * 10, 1)) + Math.sin(t * 0.9) * 0.15;
            const targetZ = p < 0.06 ? -1 : -6.5;
            group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 3, dt);
            const s = isMobile ? 0.42 : 0.78;
            group.current.scale.setScalar(s);
            group.current.rotation.y = t * 0.15 + pointer.x * 0.5;
            group.current.rotation.x = pointer.y * 0.3;
        }
        if (orb.current) orb.current.rotation.y += dt * 0.25;
        if (shell.current) {
            shell.current.rotation.x -= dt * 0.12;
            shell.current.rotation.y -= dt * 0.18;
            shell.current.material.color.copy(color);
        }
        rings.current.forEach((r, i) => {
            if (!r) return;
            r.rotation.z += dt * ringDefs[i].speed;
            r.children[0].material.color.copy(color);
        });
        moons.current.forEach((m, i) => {
            if (!m) return;
            const def = ringDefs[i % 3];
            const a = t * (0.7 + i * 0.13) + i * 2.1;
            m.position.set(Math.cos(a) * def.r, Math.sin(a) * def.r, 0);
        });
    });

    return (
        <group ref={group} position={[isMobile ? 0 : 3.3, 0, -1]}>
            <pointLight ref={light} intensity={night ? 30 : 18} distance={14} />
            <mesh ref={orb}>
                <icosahedronGeometry args={[1.25, 12]} />
                <MeshDistortMaterial
                    ref={mat}
                    speed={2.2}
                    distort={0.38}
                    roughness={0.22}
                    metalness={0.85}
                    emissiveIntensity={1}
                />
            </mesh>
            <mesh ref={shell} scale={1.65}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial wireframe transparent opacity={0.22} />
            </mesh>
            {ringDefs.map((d, i) => (
                <group key={i} rotation={d.tilt} ref={(el) => (rings.current[i] = el)}>
                    <mesh>
                        <torusGeometry args={[d.r, 0.012, 8, 160]} />
                        <meshBasicMaterial transparent opacity={0.55} />
                    </mesh>
                    <mesh ref={(el) => (moons.current[i] = el)}>
                        <sphereGeometry args={[0.07, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>
            ))}
            <Sparkles count={isMobile ? 25 : 60} scale={5} size={2.2} speed={0.5} opacity={0.7} />
        </group>
    );
}

/* ---------------- Crystal shards spread down the whole page ---------------- */
function Shards({ count }) {
    const items = useMemo(() => {
        const rand = seeded(42);
        return Array.from({ length: count }, (_, i) => {
            const side = i % 2 === 0 ? 1 : -1;
            return {
                pos: [side * (3.5 + rand() * 4.5), 4 - (i / count) * (TRAVEL + 8) + rand() * 2, -3 - rand() * 7],
                rot: [rand() * Math.PI, rand() * Math.PI, 0],
                scale: 0.25 + rand() * 0.55,
                color: SHARD_COLORS[i % SHARD_COLORS.length],
                geo: i % 3,
                speed: 0.6 + rand() * 1.4,
            };
        });
    }, [count]);

    return items.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.6} floatIntensity={1.4} position={s.pos}>
            <mesh rotation={s.rot} scale={s.scale}>
                {s.geo === 0 && <octahedronGeometry args={[1, 0]} />}
                {s.geo === 1 && <tetrahedronGeometry args={[1, 0]} />}
                {s.geo === 2 && <dodecahedronGeometry args={[0.85, 0]} />}
                <meshStandardMaterial
                    color={s.color}
                    emissive={s.color}
                    emissiveIntensity={0.25}
                    metalness={0.7}
                    roughness={0.18}
                    flatShading
                />
            </mesh>
        </Float>
    ));
}

/* ---------------- Root ---------------- */
export default function Scene3D({ night = true }) {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

    // Pointer, scroll and active-section tracking (window level, so the canvas can stay pointer-events: none)
    useEffect(() => {
        let lastY = window.scrollY;
        let lastT = performance.now();

        const onMove = (e) => {
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scroll.progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
            const now = performance.now();
            const v = ((window.scrollY - lastY) / Math.max(now - lastT, 1)) * 16;
            scroll.velocity = v;
            lastY = window.scrollY;
            lastT = now;
        };
        // velocity decays when scrolling stops
        const decay = setInterval(() => {
            scroll.velocity *= 0.85;
        }, 50);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && SECTION_COLORS[entry.target.id]) {
                        palette.target.set(SECTION_COLORS[entry.target.id]);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px' }
        );
        Object.keys(SECTION_COLORS).forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        onScroll();
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('scroll', onScroll);
            clearInterval(decay);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="scene3d" aria-hidden="true">
            <Canvas
                dpr={[1, isMobile ? 1.25 : 1.6]}
                camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 120 }}
                gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={night ? 0.35 : 0.8} />
                <directionalLight position={[5, 6, 4]} intensity={night ? 1.2 : 1.6} />
                <pointLight position={[-6, -4, 2]} intensity={12} color="#7038F8" distance={20} />
                <CameraRig />
                <Starfield count={isMobile ? 900 : 2400} night={night} />
                <EnergyCore isMobile={isMobile} night={night} />
                <Shards count={isMobile ? 10 : 22} />
            </Canvas>
        </div>
    );
}
