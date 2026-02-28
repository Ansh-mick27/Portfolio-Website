import { useEffect, useRef, memo } from 'react';

const PARTICLE_CONFIGS = {
    electric: {
        color: 'rgba(248, 208, 48, 0.6)',
        count: 25,
        speed: 2,
        size: 2,
        movement: 'zigzag',
    },
    psychic: {
        color: 'rgba(248, 88, 136, 0.4)',
        count: 15,
        speed: 0.8,
        size: 4,
        movement: 'pulse',
    },
    fire: {
        color: 'rgba(240, 128, 48, 0.5)',
        count: 30,
        speed: 1.5,
        size: 3,
        movement: 'rise',
    },
    dragon: {
        color: 'rgba(112, 56, 248, 0.4)',
        count: 20,
        speed: 1.2,
        size: 3,
        movement: 'spiral',
    },
    fighting: {
        color: 'rgba(192, 48, 40, 0.4)',
        count: 20,
        speed: 2.5,
        size: 2,
        movement: 'flash',
    },
    water: {
        color: 'rgba(104, 144, 240, 0.4)',
        count: 18,
        speed: 0.7,
        size: 5,
        movement: 'bubble',
    },
    grass: {
        color: 'rgba(120, 200, 80, 0.4)',
        count: 15,
        speed: 0.5,
        size: 3,
        movement: 'float',
    },
};

function createParticle(canvas, config) {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.size * (0.5 + Math.random()),
        speedX: (Math.random() - 0.5) * config.speed,
        speedY: (Math.random() - 0.5) * config.speed,
        opacity: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        life: Math.random(),
    };
}

function updateParticle(p, canvas, config, time) {
    const movement = config.movement;

    switch (movement) {
        case 'zigzag':
            p.x += Math.sin(time * 3 + p.phase) * config.speed;
            p.y -= config.speed * 0.5;
            break;
        case 'pulse':
            p.x += Math.cos(time + p.phase) * 0.3;
            p.y += Math.sin(time + p.phase) * 0.3;
            p.size = config.size * (1 + Math.sin(time * 2 + p.phase) * 0.4);
            break;
        case 'rise':
            p.x += Math.sin(time * 0.5 + p.phase) * 0.5;
            p.y -= config.speed;
            p.opacity *= 0.998;
            break;
        case 'spiral':
            p.x += Math.cos(time * 1.5 + p.phase) * config.speed;
            p.y += Math.sin(time * 1.5 + p.phase) * config.speed;
            break;
        case 'flash':
            p.x += p.speedX;
            p.y += p.speedY;
            p.opacity = Math.abs(Math.sin(time * 4 + p.phase)) * 0.6;
            break;
        case 'bubble':
            p.x += Math.sin(time * 0.3 + p.phase) * 0.3;
            p.y -= config.speed * 0.5;
            p.size = config.size * (1 + Math.sin(time + p.phase) * 0.2);
            break;
        case 'float':
            p.x += Math.sin(time * 0.4 + p.phase) * 0.4;
            p.y += Math.cos(time * 0.3 + p.phase) * 0.3;
            break;
        default:
            p.x += p.speedX;
            p.y += p.speedY;
    }

    // Wrap around
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.y > canvas.height + 10) p.y = -10;
    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;
}

function TypeParticles({ type = 'electric' }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animRef = useRef(null);

    const config = PARTICLE_CONFIGS[type] || PARTICLE_CONFIGS.electric;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let running = true;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };

        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        particlesRef.current = Array.from({ length: config.count }, () =>
            createParticle(canvas, config)
        );

        const animate = () => {
            if (!running) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            particlesRef.current.forEach(p => {
                updateParticle(p, canvas, config, time);

                ctx.beginPath();
                if (config.movement === 'bubble') {
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.strokeStyle = config.color.replace(/[\d.]+\)$/, `${p.opacity * 0.6})`);
                    ctx.lineWidth = 1;
                    ctx.stroke();
                } else {
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = config.color.replace(/[\d.]+\)$/, `${p.opacity})`);
                    ctx.fill();
                }

                // Glow effect
                if (config.movement !== 'flash') {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = config.color.replace(/[\d.]+\)$/, `${p.opacity * 0.15})`);
                    ctx.fill();
                }
            });

            animRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            running = false;
            window.removeEventListener('resize', resize);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [config]);

    return (
        <canvas
            ref={canvasRef}
            className="type-particles-canvas"
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    );
}

export default memo(TypeParticles);
