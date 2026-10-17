import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Billboard, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------
   Shared, mutable state read inside the render loop (no re-renders).
------------------------------------------------------------------- */
const pointer = { x: 0, y: 0 };
const scroll = { progress: 0, velocity: 0 };
const palette = { target: new THREE.Color('#6890F0') };

// Section id → Pokémon type colour the arena light / aura shifts to
const SECTION_COLORS = {
    hero: '#6890F0',
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

const art = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Partner standing on the battle platform, plus three party members orbiting it
const PARTNER = art(448); // Lucario — the site's mascot
const PARTY = [art(25), art(6), art(94)]; // Pikachu, Charizard, Gengar

// Wild Pokémon drifting in 3D space down the length of the page
const WILD = [150, 149, 130, 133, 1, 197, 196, 143, 384, 282, 65, 137, 151, 7, 4, 39];

// How far (world units) the camera travels down while the page scrolls top → bottom
const TRAVEL = 46;

function seeded(seed) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

/* ---------------- Sprite texture loader (fails quietly) ---------------- */
const textureCache = new Map();
function useSprite(url) {
    const [tex, setTex] = useState(() => textureCache.get(url) || null);
    useEffect(() => {
        if (textureCache.has(url)) return setTex(textureCache.get(url));
        let alive = true;
        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('anonymous');
        loader.load(
            url,
            (t) => {
                t.colorSpace = THREE.SRGBColorSpace;
                t.anisotropy = 4;
                textureCache.set(url, t);
                if (alive) setTex(t);
            },
            undefined,
            () => {} // offline / blocked → just don't show the sprite
        );
        return () => {
            alive = false;
        };
    }, [url]);
    return tex;
}

function Sprite({ url, size = 1, opacity = 1, ...props }) {
    const tex = useSprite(url);
    if (!tex) return null;
    return (
        <Billboard {...props}>
            <mesh>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial map={tex} transparent opacity={opacity} alphaTest={0.05} depthWrite={false} toneMapped={false} />
            </mesh>
        </Billboard>
    );
}

/* ---------------- Camera rig: scroll dolly + mouse parallax ---------------- */
function CameraRig() {
    const { camera } = useThree();
    const look = useMemo(() => new THREE.Vector3(), []);
    useFrame((_, dt) => {
        const targetY = -scroll.progress * TRAVEL;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.9, 2.5, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + pointer.y * 0.6, 5, dt);
        look.set(0, camera.position.y - pointer.y * 0.3, -6);
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
            g.scale.y = THREE.MathUtils.damp(g.scale.y, warp, 5, dt); // streaks on fast scroll
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

/* ---------------- Hero: 3D battle arena with partner Pokémon ---------------- */
function BattleArena({ isMobile, night }) {
    const root = useRef();
    const partner = useRef();
    const shadow = useRef();
    const glowMats = useRef([]);
    const light = useRef();
    const rings = useRef([]);
    const moons = useRef([]);
    const color = useMemo(() => new THREE.Color('#6890F0'), []);

    const ringDefs = useMemo(
        () => [
            { r: 2.3, tilt: [1.35, 0.15, 0], speed: 0.55, y: 0.6 },
            { r: 2.75, tilt: [1.15, -0.35, 0.25], speed: -0.4, y: 0.9 },
            { r: 3.15, tilt: [1.5, 0.45, -0.3], speed: 0.3, y: 0.4 },
        ],
        []
    );

    useFrame((state, dt) => {
        const t = state.clock.elapsedTime;
        color.lerp(palette.target, 1 - Math.exp(-2.5 * dt));
        glowMats.current.forEach((m) => m && m.color.copy(color));
        if (light.current) light.current.color.copy(color);

        if (root.current) {
            root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * 0.35, 3, dt);
            root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -pointer.y * 0.08, 3, dt);
        }
        if (partner.current) {
            // idle "battle stance" bob + breathing squash
            const bob = Math.abs(Math.sin(t * 2.2)) * 0.18;
            partner.current.position.y = 1.15 + bob;
            partner.current.scale.set(1 + Math.sin(t * 4.4) * 0.012, 1 - Math.sin(t * 4.4) * 0.012, 1);
        }
        if (shadow.current) shadow.current.scale.setScalar(1 - Math.abs(Math.sin(t * 2.2)) * 0.12);

        rings.current.forEach((r, i) => r && (r.rotation.z += dt * ringDefs[i].speed));
        moons.current.forEach((m, i) => {
            if (!m) return;
            const d = ringDefs[i];
            const a = t * (0.5 + i * 0.12) + i * 2.1;
            m.position.set(Math.cos(a) * d.r, Math.sin(a) * d.r, 0);
        });
    });

    const x = isMobile ? 0 : 3.2;
    const y = isMobile ? 2.2 : -0.2;
    const s = isMobile ? 0.5 : 0.85;

    return (
        <group ref={root} position={[x, y, -1]} scale={s}>
            <pointLight ref={light} position={[0, 1.5, 1.5]} intensity={night ? 25 : 14} distance={10} />

            {/* Battle platform */}
            <group position={[0, -1, 0]}>
                <mesh position={[0, -0.12, 0]}>
                    <cylinderGeometry args={[2.2, 2.35, 0.25, 64]} />
                    <meshStandardMaterial color={night ? '#2f5d2a' : '#5f9c4f'} roughness={0.85} />
                </mesh>
                <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[2.2, 64]} />
                    <meshStandardMaterial color={night ? '#4e8f3f' : '#86c46e'} roughness={0.9} />
                </mesh>
                {/* arena markings */}
                {[2.05, 1.25].map((r, i) => (
                    <mesh key={r} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[r - 0.05, r, 64]} />
                        <meshBasicMaterial ref={(m) => (glowMats.current[i] = m)} transparent opacity={0.85} toneMapped={false} />
                    </mesh>
                ))}
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4.1, 0.05]} />
                    <meshBasicMaterial ref={(m) => (glowMats.current[2] = m)} transparent opacity={0.6} toneMapped={false} />
                </mesh>
                <mesh ref={shadow} position={[0, 0.03, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.95, 40]} />
                    <meshBasicMaterial color="#000" transparent opacity={0.35} depthWrite={false} />
                </mesh>
            </group>

            {/* Partner Pokémon */}
            <group ref={partner} position={[0, 1.15, 0.1]}>
                <Sprite url={PARTNER} size={3.2} />
            </group>

            {/* Aura */}
            <Sparkles count={isMobile ? 30 : 70} scale={[3.5, 3.5, 2]} position={[0, 1.2, 0]} size={3} speed={0.6} color="#7fb2ff" opacity={0.9} />

            {/* Party orbiting the arena */}
            {ringDefs.map((d, i) => (
                <group key={i} position={[0, d.y, 0]} rotation={d.tilt} ref={(el) => (rings.current[i] = el)}>
                    <mesh>
                        <torusGeometry args={[d.r, 0.012, 8, 160]} />
                        <meshBasicMaterial ref={(m) => (glowMats.current[3 + i] = m)} transparent opacity={0.45} toneMapped={false} />
                    </mesh>
                    <group ref={(el) => (moons.current[i] = el)}>
                        <Sprite url={PARTY[i]} size={0.95} />
                    </group>
                </group>
            ))}
        </group>
    );
}

/* ---------------- Wild Pokémon drifting through 3D space below the hero ---------------- */
function WildPokemon({ count }) {
    const items = useMemo(() => {
        const rand = seeded(42);
        return WILD.slice(0, count).map((id, i) => {
            const side = i % 2 === 0 ? 1 : -1;
            return {
                url: art(id),
                pos: [side * (4.2 + rand() * 3.5), -5 - (i / count) * (TRAVEL - 2) + rand() * 2, -4 - rand() * 6],
                size: 1.6 + rand() * 1.4,
                speed: 0.8 + rand() * 1.2,
                opacity: 0.4 + rand() * 0.25,
            };
        });
    }, [count]);

    return items.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={0.25} floatIntensity={1.6} position={p.pos}>
            <Sprite url={p.url} size={p.size} opacity={p.opacity} />
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
            scroll.velocity = ((window.scrollY - lastY) / Math.max(now - lastT, 1)) * 16;
            lastY = window.scrollY;
            lastT = now;
        };
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
                <ambientLight intensity={night ? 0.55 : 0.95} />
                <directionalLight position={[3, 6, 5]} intensity={night ? 1.4 : 1.8} />
                <CameraRig />
                <Starfield count={isMobile ? 900 : 2400} night={night} />
                <BattleArena isMobile={isMobile} night={night} />
                <WildPokemon count={isMobile ? 8 : 16} />
            </Canvas>
        </div>
    );
}
