import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

// Pokémon sprites mapped — using PokeAPI sprite URLs
const pokemonSprites = {
    charizard: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    gengar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    mewtwo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    lucario: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    eevee: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    dragonite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    gyarados: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
    pikachu: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    rayquaza: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',
    umbreon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',
};

const heroPokemons = ['charizard', 'gengar', 'dragonite', 'mewtwo', 'lucario', 'eevee', 'pikachu', 'rayquaza'];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing effect
    useEffect(() => {
        const currentRole = personalInfo.roles[roleIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(currentRole.slice(0, displayText.length + 1));
                if (displayText === currentRole) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setDisplayText(currentRole.slice(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    // Generate random positions for floating Pokémon in hero
    const pokemonPositions = useMemo(() => {
        return heroPokemons.map((name, i) => ({
            name,
            src: pokemonSprites[name],
            left: `${5 + (i * 12) % 90}%`,
            top: `${10 + ((i * 17 + 5) % 75)}%`,
            size: 60 + (i % 3) * 30,
            delay: i * 0.8,
            duration: 5 + (i % 4) * 2,
            opacity: 0.08 + (i % 3) * 0.04,
        }));
    }, []);

    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } }
    };

    return (
        <section className="hero" id="hero">
            {/* Starry background */}
            <div className="hero-bg">
                <div className="stars" />

                {/* Floating Pokémon in Hero */}
                {pokemonPositions.map((p, i) => (
                    <motion.img
                        key={i}
                        src={p.src}
                        alt={p.name}
                        style={{
                            position: 'absolute',
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            opacity: p.opacity,
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))',
                            pointerEvents: 'none',
                            objectFit: 'contain',
                        }}
                        animate={{
                            y: [0, -25, 0],
                            x: [0, 10, -10, 0],
                            rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <motion.div
                className="hero-content"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                <motion.p className="battle-intro" variants={fadeUp}>
                    ⚔️ A wild developer appeared!
                </motion.p>

                <motion.h1 className="hero-name" variants={fadeUp}>
                    {personalInfo.name}
                </motion.h1>

                <motion.div className="hero-role" variants={fadeUp}>
                    {'> '}{displayText}<span className="cursor">_</span>
                </motion.div>

                <motion.div className="rpg-textbox" variants={fadeUp}>
                    <p>{personalInfo.bio}</p>
                </motion.div>

                <motion.div className="hero-buttons" variants={fadeUp}>
                    <a className="pokeball-btn" href="#projects">
                        🎴 View Projects
                    </a>
                    <a className="pokeball-btn secondary" href="#contact">
                        📬 Contact Me
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span>SCROLL DOWN</span>
                <div className="scroll-pokeball" />
            </motion.div>
        </section>
    );
}
