import { useState, useEffect } from 'react';

export default function CountUp({ end, duration = 2000 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const startVal = 0;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(startVal + (end - startVal) * eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    return <>{count}{end >= 999 ? '+' : ''}</>;
}
