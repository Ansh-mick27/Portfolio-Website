import { useRef } from 'react';

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Wraps children in a 3D perspective tilt that follows the pointer,
 * with an optional moving glare highlight. Writes CSS variables only,
 * so it never fights Framer Motion transforms on the children.
 */
export default function Tilt({ children, max = 12, glare = true, scale = 1.03, className = '', style }) {
    const ref = useRef(null);
    const frame = useRef(0);

    const onMove = (e) => {
        if (!canHover()) return;
        const el = ref.current;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.setProperty('--tilt-rx', `${(0.5 - py) * max}deg`);
            el.style.setProperty('--tilt-ry', `${(px - 0.5) * max}deg`);
            el.style.setProperty('--tilt-s', scale);
            el.style.setProperty('--glare-x', `${px * 100}%`);
            el.style.setProperty('--glare-y', `${py * 100}%`);
            el.style.setProperty('--glare-o', 1);
            el.style.setProperty('--px', (px - 0.5).toFixed(3));
            el.style.setProperty('--py', (py - 0.5).toFixed(3));
        });
    };

    const onLeave = () => {
        const el = ref.current;
        cancelAnimationFrame(frame.current);
        el.style.setProperty('--tilt-rx', '0deg');
        el.style.setProperty('--tilt-ry', '0deg');
        el.style.setProperty('--tilt-s', 1);
        el.style.setProperty('--glare-o', 0);
        el.style.setProperty('--px', 0);
        el.style.setProperty('--py', 0);
    };

    return (
        <div ref={ref} className={`tilt ${className}`} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
            {children}
            {glare && <span className="tilt-glare" aria-hidden="true" />}
        </div>
    );
}
