import { useEffect, useRef } from 'react';

/**
 * Soft glowing cursor ring with spring lag + trailing dot.
 * Grows over links/buttons/cards. Desktop (fine pointer) only.
 */
export default function CursorGlow() {
    const ring = useRef(null);
    const dot = useRef(null);

    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduce) return;

        document.body.classList.add('has-cursor-glow');
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const ringPos = { ...pos };
        let raf;
        let hovering = false;

        const move = (e) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
            const t = e.target.closest?.('a, button, .project-card, .skill-card, .skill-sphere, [role="button"]');
            hovering = !!t;
        };
        const loop = () => {
            ringPos.x += (pos.x - ringPos.x) * 0.16;
            ringPos.y += (pos.y - ringPos.y) * 0.16;
            if (ring.current) {
                ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
            }
            if (dot.current) {
                dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
            }
            raf = requestAnimationFrame(loop);
        };
        window.addEventListener('pointermove', move, { passive: true });
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', move);
            document.body.classList.remove('has-cursor-glow');
        };
    }, []);

    return (
        <>
            <div ref={ring} className="cursor-ring" aria-hidden="true" />
            <div ref={dot} className="cursor-dot" aria-hidden="true" />
        </>
    );
}
