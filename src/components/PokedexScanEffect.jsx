import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PokedexScanEffect({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div ref={ref} className="pokedex-scan-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Red scan line */}
            {isInView && (
                <motion.div
                    className="pokedex-scan-line"
                    initial={{ top: '-2px' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.2, ease: 'linear' }}
                />
            )}

            {/* Red tint overlay */}
            {isInView && (
                <motion.div
                    className="pokedex-scan-tint"
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />
            )}

            {children}
        </div>
    );
}
