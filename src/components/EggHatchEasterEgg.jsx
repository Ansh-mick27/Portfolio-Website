import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from './SoundManager';

const hatchablePokemon = [
    { name: 'Pichu', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png' },
    { name: 'Togepi', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png' },
    { name: 'Elekid', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/239.png' },
    { name: 'Magby', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/240.png' },
    { name: 'Riolu', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png' },
    { name: 'Eevee', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' },
    { name: 'Munchlax', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/446.png' },
    { name: 'Happiny', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/440.png' },
];

// Stages: idle → wobble1 → wobble2 → wobble3 → crack → hatch
const STAGES = ['idle', 'wobble1', 'wobble2', 'wobble3', 'crack', 'hatch'];

export default function EggHatchEasterEgg() {
    const [stage, setStage] = useState(0); // index into STAGES
    const [hatchedPokemon, setHatchedPokemon] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { playSound } = useSounds();

    const currentStage = STAGES[stage];

    const handleClick = useCallback(() => {
        if (currentStage === 'hatch') return; // Already hatched, wait for reset

        playSound('click');

        const nextStage = stage + 1;
        setStage(nextStage);

        if (STAGES[nextStage] === 'hatch') {
            // Pick random Pokémon
            const pokemon = hatchablePokemon[Math.floor(Math.random() * hatchablePokemon.length)];
            setHatchedPokemon(pokemon);
            setShowConfetti(true);
            playSound('hatch');

            // Reset after 6 seconds
            setTimeout(() => {
                setStage(0);
                setHatchedPokemon(null);
                setShowConfetti(false);
            }, 6000);
        }
    }, [stage, currentStage, playSound]);

    // Confetti particles
    const confettiParticles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 200,
            y: -(Math.random() * 150 + 50),
            rotate: Math.random() * 720 - 360,
            color: ['#F8D030', '#F08030', '#6890F0', '#78C850', '#F85888', '#7038F8'][Math.floor(Math.random() * 6)],
            size: 4 + Math.random() * 6,
            delay: Math.random() * 0.3,
        }));
    }, []);

    const eggVariants = {
        idle: { rotate: 0 },
        wobble1: {
            rotate: [0, -15, 15, -10, 10, 0],
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
        wobble2: {
            rotate: [0, -20, 20, -15, 15, -5, 5, 0],
            transition: { duration: 0.7, ease: 'easeInOut' }
        },
        wobble3: {
            rotate: [0, -25, 25, -20, 20, -10, 10, -5, 5, 0],
            scale: [1, 1.05, 1, 1.05, 1],
            transition: { duration: 0.8, ease: 'easeInOut' }
        },
        crack: {
            rotate: [0, -30, 30, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1.15, 0],
            transition: { duration: 0.8, ease: 'easeInOut' }
        },
        hatch: {
            scale: 0,
            opacity: 0,
            transition: { duration: 0.01 }
        },
    };

    return (
        <div className="egg-easter-egg">
            <div className="egg-container" onClick={handleClick}>
                {/* Egg */}
                <AnimatePresence mode="wait">
                    {currentStage !== 'hatch' ? (
                        <motion.div
                            key="egg"
                            className={`pokemon-egg ${currentStage}`}
                            animate={currentStage}
                            variants={eggVariants}
                            style={{ cursor: 'pointer' }}
                            whileHover={{ scale: 1.08 }}
                        >
                            <div className="egg-shell">
                                <div className="egg-pattern" />
                                {(currentStage === 'crack' || currentStage === 'wobble3') && (
                                    <div className="egg-crack-lines" />
                                )}
                            </div>
                            <span className="egg-hint">
                                {stage === 0 ? '🥚 Click me!' : `${3 - stage + 1} more...`}
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="hatched"
                            className="hatched-reveal"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                        >
                            <motion.img
                                src={hatchedPokemon?.sprite}
                                alt={hatchedPokemon?.name}
                                className="hatched-pokemon"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.span
                                className="hatched-name"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {hatchedPokemon?.name} hatched! ✨
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Confetti */}
                <AnimatePresence>
                    {showConfetti && confettiParticles.map(p => (
                        <motion.div
                            key={p.id}
                            className="confetti-particle"
                            style={{
                                backgroundColor: p.color,
                                width: p.size,
                                height: p.size,
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                            animate={{
                                x: p.x,
                                y: p.y,
                                opacity: 0,
                                rotate: p.rotate,
                                scale: 0,
                            }}
                            transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
