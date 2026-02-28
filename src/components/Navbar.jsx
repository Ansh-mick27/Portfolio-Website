import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from './SoundManager';
import ThemeToggle from './ThemeToggle';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const navItems = [
    { label: "Home", to: "hero" },
    { label: "About", to: "about" },
    { label: "Skills", to: "skills" },
    { label: "Projects", to: "projects" },
    { label: "Journey", to: "experience" },
    { label: "Education", to: "education" },
    { label: "Research", to: "publications" },
    { label: "Badges", to: "certifications" },
    { label: "Achievements", to: "achievements" },
    { label: "Contact", to: "contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { muted, toggleMute, playSound } = useSounds();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map(item => document.getElementById(item.to));
            let current = 'hero';
            sections.forEach(section => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 200) {
                        current = section.id;
                    }
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        playSound('click');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
                <div className="navbar-content">
                    <a className="navbar-logo" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer' }}>
                        <div className="pokeball-icon" />
                        <span>ANSHUL</span>
                    </a>

                    <ul className="navbar-links">
                        {navItems.map(item => (
                            <li key={item.to}>
                                <a
                                    className={activeSection === item.to ? 'active' : ''}
                                    onClick={() => scrollTo(item.to)}
                                    onMouseEnter={() => playSound('hover')}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar-controls">
                        {/* Sound Toggle */}
                        <motion.button
                            className="sound-toggle"
                            onClick={toggleMute}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title={muted ? 'Unmute sounds' : 'Mute sounds'}
                            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
                        >
                            {muted ? <FiVolumeX /> : <FiVolume2 />}
                        </motion.button>

                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>

                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu open"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.to}
                                className={activeSection === item.to ? 'active' : ''}
                                onClick={() => scrollTo(item.to)}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                {item.label}
                            </motion.a>
                        ))}

                        <div className="mobile-menu-controls">
                            <motion.button
                                className="sound-toggle"
                                onClick={toggleMute}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {muted ? <FiVolumeX /> : <FiVolume2 />}
                                <span>{muted ? 'Sound Off' : 'Sound On'}</span>
                            </motion.button>
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
