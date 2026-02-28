import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';

const spriteMap = {
    charizard: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    gengar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    mewtwo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    dragonite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    eevee: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    umbreon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png',
    espeon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png',
    gardevoir: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png',
    snorlax: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
    rayquaza: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',
    alakazam: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png',
    lucario: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
};

// Shiny variant sprites (using alternate artwork IDs for visual variety)
const shinySprites = {
    charizard: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png',
    gengar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/94.png',
    mewtwo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/150.png',
    dragonite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/149.png',
    eevee: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/133.png',
    umbreon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/197.png',
    espeon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/196.png',
    gardevoir: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/282.png',
    snorlax: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/143.png',
    rayquaza: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/384.png',
    alakazam: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/65.png',
    lucario: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/448.png',
};

const pokemonNames = Object.keys(spriteMap);

// Sparkle SVG component for shiny Pokémon
function ShinySparkles({ size }) {
    const sparkles = useMemo(() => {
        return Array.from({ length: 5 }, (_, i) => ({
            id: i,
            cx: (Math.random() - 0.5) * size * 1.5,
            cy: (Math.random() - 0.5) * size * 1.5,
            delay: i * 0.4,
            scale: 0.4 + Math.random() * 0.8,
        }));
    }, [size]);

    return (
        <div className="shiny-sparkles" style={{ width: size, height: size }}>
            {sparkles.map(s => (
                <motion.div
                    key={s.id}
                    className="sparkle-star"
                    style={{
                        left: `calc(50% + ${s.cx}px)`,
                        top: `calc(50% + ${s.cy}px)`,
                        transform: `scale(${s.scale})`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, s.scale, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: 'easeInOut',
                    }}
                >
                    ✦
                </motion.div>
            ))}
        </div>
    );
}

function FloatingPokemon() {
    const floaters = useMemo(() => {
        return pokemonNames.slice(0, 8).map((name, i) => {
            const positions = [
                { left: '3%', top: '15%' },
                { left: '92%', top: '8%' },
                { left: '88%', top: '35%' },
                { left: '5%', top: '45%' },
                { left: '95%', top: '60%' },
                { left: '2%', top: '72%' },
                { left: '90%', top: '82%' },
                { left: '8%', top: '90%' },
            ];
            const pos = positions[i];
            // 5% (1/20) chance of being shiny
            const isShiny = Math.random() < 0.05;
            return {
                name,
                src: isShiny ? (shinySprites[name] || spriteMap[name]) : spriteMap[name],
                isShiny,
                ...pos,
                size: 50 + (i % 3) * 20,
                duration: 7 + (i % 5) * 2,
                delay: i * 1.2,
                opacity: isShiny ? 0.15 : 0.06 + (i % 3) * 0.03,
            };
        });
    }, []);

    return (
        <div className="floating-pokemon-container">
            {floaters.map((p, i) => (
                <div
                    key={i}
                    className={`floating-pokemon-wrap ${p.isShiny ? 'shiny' : ''}`}
                    style={{
                        position: 'fixed',
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <motion.img
                        src={p.src}
                        alt={p.name}
                        className={`floating-pokemon ${p.isShiny ? 'shiny-pokemon' : ''}`}
                        style={{
                            width: p.size,
                            height: p.size,
                            opacity: p.opacity,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 15, -15, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: 'easeInOut',
                        }}
                    />
                    {p.isShiny && <ShinySparkles size={p.size} />}
                </div>
            ))}
        </div>
    );
}

export default memo(FloatingPokemon);
