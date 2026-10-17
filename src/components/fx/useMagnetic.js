import { useEffect, useRef } from 'react';

/** Pulls an element toward the cursor when it gets close (magnetic button). */
export default function useMagnetic(strength = 0.35) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        const move = (e) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0) rotateX(${-dy * 0.3}deg) rotateY(${dx * 0.3}deg)`;
        };
        const leave = () => {
            el.style.transform = '';
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        return () => {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerleave', leave);
        };
    }, [strength]);
    return ref;
}
