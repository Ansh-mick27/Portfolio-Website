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

const pokemonNames = Object.keys(spriteMap);

function FloatingPokemon() {
    const floaters = useMemo(() => {
        return pokemonNames.slice(0, 8).map((name, i) => {
            // Deterministic positions spread across the page
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
            return {
                name,
                src: spriteMap[name],
                ...pos,
                size: 50 + (i % 3) * 20,
                duration: 7 + (i % 5) * 2,
                delay: i * 1.2,
                opacity: 0.06 + (i % 3) * 0.03,
            };
        });
    }, []);

    return (
        <div className="floating-pokemon-container">
            {floaters.map((p, i) => (
                <motion.img
                    key={i}
                    src={p.src}
                    alt={p.name}
                    className="floating-pokemon"
                    style={{
                        left: p.left,
                        top: p.top,
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
            ))}
        </div>
    );
}

export default memo(FloatingPokemon);
