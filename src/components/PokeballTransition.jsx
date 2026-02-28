import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PokeballTransition({ children, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [animationDone, setAnimationDone] = useState(false);

    return (
        <div ref={ref} className="pokeball-transition-wrapper" style={{ position: 'relative' }}>
            {/* Pokéball fly-in animation overlay */}
            {isInView && !animationDone && (
                <motion.div
                    className="pokeball-flyover"
                    initial={{ x: '-100%', y: '-50%', scale: 0.3, opacity: 1 }}
                    animate={{
                        x: ['−100%', '45%', '50%'],
                        y: ['-50%', '-50%', '-50%'],
                        scale: [0.3, 1, 1.2],
                        opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 0.8, delay: delay, ease: [0.34, 1.56, 0.64, 1] }}
                    onAnimationComplete={() => setAnimationDone(true)}
                >
                    <div className="flying-pokeball">
                        <div className="pokeball-top-half" />
                        <div className="pokeball-mid-band">
                            <div className="pokeball-center-btn" />
                        </div>
                        <div className="pokeball-bottom-half" />
                    </div>
                </motion.div>
            )}

            {/* White flash */}
            {isInView && (
                <motion.div
                    className="pokeball-flash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.6, 0] }}
                    transition={{ duration: 1, delay: delay + 0.5, times: [0, 0.3, 0.5, 1] }}
                />
            )}

            {/* Content with fade-in */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: delay + 0.7 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
