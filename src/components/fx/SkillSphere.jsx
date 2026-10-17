import { useEffect, useMemo, useRef } from 'react';

/**
 * A rotating 3D globe of skill tags (pure CSS 3D + rAF, no WebGL).
 * Drag / swipe to spin it; it keeps its momentum and then settles to an idle spin.
 */
export default function SkillSphere({ groups }) {
    const wrap = useRef(null);
    const tagRefs = useRef([]);

    const tags = useMemo(() => {
        const flat = groups.flatMap((g) => g.skills.map((s) => ({ label: s, color: g.color, type: g.type })));
        const n = flat.length;
        // Fibonacci sphere → evenly spaced points
        return flat.map((t, i) => {
            const y = 1 - (i / (n - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = Math.PI * (3 - Math.sqrt(5)) * i;
            return { ...t, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
        });
    }, [groups]);

    useEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let rotX = -0.3;
        let rotY = 0;
        let vx = 0.0016;
        let vy = 0.0042;
        let dragging = false;
        let last = { x: 0, y: 0 };
        let raf;
        let visible = true;

        const radius = () => Math.min(el.clientWidth, 520) * 0.42;

        const render = () => {
            const R = radius();
            const cx = Math.cos(rotX), sx = Math.sin(rotX);
            const cy = Math.cos(rotY), sy = Math.sin(rotY);
            tags.forEach((t, i) => {
                const node = tagRefs.current[i];
                if (!node) return;
                // rotate around Y then X
                const x1 = t.x * cy + t.z * sy;
                const z1 = -t.x * sy + t.z * cy;
                const y2 = t.y * cx - z1 * sx;
                const z2 = t.y * sx + z1 * cx;
                const depth = (z2 + 1) / 2; // 0 back → 1 front
                node.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, ${z2 * R}px) scale(${0.6 + depth * 0.6})`;
                node.style.opacity = (0.25 + depth * 0.75).toFixed(2);
                node.style.zIndex = Math.round(depth * 100);
                node.style.filter = depth < 0.35 ? `blur(${((0.35 - depth) * 4).toFixed(1)}px)` : 'none';
            });
        };

        const loop = () => {
            if (!dragging) {
                // ease back toward idle spin
                vx += (0.0016 - vx) * 0.02;
                vy += (0.0042 - vy) * 0.02;
            }
            rotX += vx;
            rotY += vy;
            render();
            raf = requestAnimationFrame(loop);
        };

        const down = (e) => {
            dragging = true;
            last = { x: e.clientX, y: e.clientY };
            el.setPointerCapture?.(e.pointerId);
            el.classList.add('grabbing');
        };
        const move = (e) => {
            if (!dragging) {
                return;
            }
            const dx = e.clientX - last.x;
            const dy = e.clientY - last.y;
            vy = dx * 0.0035;
            vx = -dy * 0.0035;
            last = { x: e.clientX, y: e.clientY };
        };
        const up = () => {
            dragging = false;
            el.classList.remove('grabbing');
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(raf);
            if (visible && !reduce) raf = requestAnimationFrame(loop);
        });
        io.observe(el);

        render();
        el.addEventListener('pointerdown', down);
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            el.removeEventListener('pointerdown', down);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
    }, [tags]);

    return (
        <div className="skill-sphere-wrap">
            <div className="skill-sphere" ref={wrap} role="list" aria-label="All skills">
                <div className="skill-sphere-core" aria-hidden="true" />
                {tags.map((t, i) => (
                    <span
                        key={t.label + i}
                        role="listitem"
                        ref={(n) => (tagRefs.current[i] = n)}
                        className="skill-sphere-tag"
                        style={{ '--tag-color': t.color }}
                    >
                        {t.label}
                    </span>
                ))}
            </div>
            <p className="skill-sphere-hint">↻ Drag to spin the skill globe</p>
        </div>
    );
}
