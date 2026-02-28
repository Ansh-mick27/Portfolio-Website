import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from './SoundManager';

const espeonSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png';
const umbreonSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('pokemon-theme');
        return stored ? stored === 'night' : true;
    });
    const { playSound } = useSounds();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'night' : 'day');
        localStorage.setItem('pokemon-theme', isDark ? 'night' : 'day');
    }, [isDark]);

    const toggle = () => {
        playSound('toggle');
        setIsDark(prev => !prev);
    };

    return (
        <motion.button
            className="theme-toggle"
            onClick={toggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={isDark ? 'Switch to Day (Espeon)' : 'Switch to Night (Umbreon)'}
        >
            <AnimatePresence mode="wait">
                <motion.img
                    key={isDark ? 'umbreon' : 'espeon'}
                    src={isDark ? umbreonSprite : espeonSprite}
                    alt={isDark ? 'Umbreon (Night)' : 'Espeon (Day)'}
                    className="theme-toggle-sprite"
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                />
            </AnimatePresence>
            <span className="theme-toggle-label">
                {isDark ? '🌙' : '☀️'}
            </span>
        </motion.button>
    );
}
