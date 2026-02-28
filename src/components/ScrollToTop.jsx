import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from './SoundManager';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const { playSound } = useSounds();

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        playSound('click');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    initial={{ scale: 0, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.85 }}
                    title="Scroll to top"
                    aria-label="Scroll to top"
                >
                    <div className="pokeball-scroll-icon">
                        <div className="pokeball-top" />
                        <div className="pokeball-band">
                            <div className="pokeball-center" />
                        </div>
                        <div className="pokeball-bottom" />
                    </div>
                    <span className="scroll-top-arrow">▲</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
