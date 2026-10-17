import { lazy, Suspense, useEffect, useState } from 'react';

// Loaded as a separate chunk so Three.js never blocks first paint
const Scene3D = lazy(() => import('./Scene3D'));

function hasWebGL() {
    try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
        return false;
    }
}

function useTheme() {
    const read = () => document.documentElement.getAttribute('data-theme') !== 'day';
    const [night, setNight] = useState(read);
    useEffect(() => {
        const obs = new MutationObserver(() => setNight(read()));
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => obs.disconnect();
    }, []);
    return night;
}

export default function Background3D() {
    const night = useTheme();
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reduce.matches || !hasWebGL()) return;
        // Wait until the browser is idle so the hero text paints first
        const start = () => setEnabled(true);
        const id = 'requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 300);
        return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id));
    }, []);

    if (!enabled) return null;
    return (
        <Suspense fallback={null}>
            <Scene3D night={night} />
        </Suspense>
    );
}
