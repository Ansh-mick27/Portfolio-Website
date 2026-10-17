import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolio';
import Tilt from './fx/Tilt';

// National Pokédex numbers for each type's mascot
const DEX = { charizard: 6, pikachu: 25, gyarados: 130, mewtwo: 150, bulbasaur: 1, dragonite: 149 };
const art = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Every skill becomes a numbered TM (technical machine)
function useMoves() {
    return useMemo(() => {
        let n = 0;
        return skills.map((cat) => ({
            ...cat,
            moves: cat.skills.map((name) => ({ name, tm: String(++n).padStart(2, '0') })),
        }));
    }, []);
}

function TechDex({ categories }) {
    const [active, setActive] = useState(0);
    const [auto, setAuto] = useState(true);
    const cat = categories[active];
    const dexNo = DEX[cat.pokemon];

    // Cycle through types until the visitor picks one
    useEffect(() => {
        if (!auto) return;
        const id = setInterval(() => setActive((a) => (a + 1) % categories.length), 5500);
        return () => clearInterval(id);
    }, [auto, categories.length]);

    const pick = (i) => {
        setAuto(false);
        setActive(i);
    };

    return (
        <div className="techdex" style={{ '--dex-color': cat.color }}>
            {/* Type selector */}
            <div className="techdex-types" role="tablist" aria-label="Skill types">
                {categories.map((c, i) => (
                    <button
                        key={c.type}
                        role="tab"
                        aria-selected={i === active}
                        className={`techdex-type type-badge ${c.type} ${i === active ? 'active' : ''}`}
                        onClick={() => pick(i)}
                    >
                        {c.typeName}
                    </button>
                ))}
            </div>

            <motion.div
                className="pokedex-frame techdex-frame"
                initial={{ opacity: 0, rotateX: 35, y: 60 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1200 }}
            >
                <div className="pokedex-inner">
                    <div className="pokedex-lights">
                        <div className="pokedex-light blue" />
                        <div className="pokedex-light red" />
                        <div className="pokedex-light green" />
                        <span className="techdex-label">TECH-DEX v2.6</span>
                    </div>

                    <div className="techdex-body">
                        {/* Left screen: the type's Pokémon */}
                        <div className="techdex-screen">
                            <div className="techdex-scanline" aria-hidden="true" />
                            <div className="techdex-ring" aria-hidden="true" />
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={cat.pokemon}
                                    src={art(dexNo)}
                                    alt={cat.pokemon}
                                    className="techdex-sprite"
                                    initial={{ opacity: 0, scale: 0.3, rotateY: -90, filter: 'brightness(6)' }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'brightness(1)' }}
                                    exit={{ opacity: 0, scale: 0.3, rotateY: 90, filter: 'brightness(6)' }}
                                    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                                />
                            </AnimatePresence>
                            <div className="techdex-id">
                                <span>No.{String(dexNo).padStart(3, '0')}</span>
                                <span className="techdex-mon">{cat.pokemon.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Right screen: moveset */}
                        <div className="techdex-moves">
                            <div className="techdex-moves-head">
                                <span className={`type-badge ${cat.type}`}>{cat.typeName}</span>
                                <h3>{cat.title}</h3>
                            </div>
                            <p className="techdex-moves-sub">MOVESET · {cat.moves.length} TMs learned</p>
                            <AnimatePresence mode="wait">
                                <motion.ul key={cat.type} className="techdex-list">
                                    {cat.moves.map((m, j) => (
                                        <motion.li
                                            key={m.name}
                                            initial={{ opacity: 0, x: 30, rotateX: -70 }}
                                            animate={{ opacity: 1, x: 0, rotateX: 0 }}
                                            exit={{ opacity: 0, x: -30, transition: { duration: 0.15 } }}
                                            transition={{ delay: j * 0.05, duration: 0.35 }}
                                        >
                                            <span className="techdex-tm">TM{m.tm}</span>
                                            <span className="techdex-move">{m.name}</span>
                                            <span className="techdex-disc" aria-hidden="true" />
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* D-pad style pager */}
                    <div className="techdex-controls">
                        <button aria-label="Previous type" onClick={() => pick((active - 1 + categories.length) % categories.length)}>◀</button>
                        <div className="techdex-dots">
                            {categories.map((c, i) => (
                                <span key={c.type} className={i === active ? 'on' : ''} />
                            ))}
                        </div>
                        <button aria-label="Next type" onClick={() => pick((active + 1) % categories.length)}>▶</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Skills() {
    const categories = useMoves();

    return (
        <section className="section skills-section" id="skills">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>⚡ Tech-Dex · Moveset</span>
            </motion.h2>

            <TechDex categories={categories} />

            <h3 className="type-chart-title">Type Matchup Chart</h3>
            <div className="skills-grid">
                {categories.map((category, i) => (
                    <Tilt key={category.type} max={14} className="tilt-skill">
                        <motion.div
                            className={`skill-card ${category.type}`}
                            initial={{ opacity: 0, y: 70, rotateX: -45, z: -120 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                            style={{ transformPerspective: 1000 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <div className="skill-card-header">
                                <motion.img
                                    src={art(DEX[category.pokemon])}
                                    alt={category.pokemon}
                                    loading="lazy"
                                    className="skill-pokemon parallax-sprite"
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                                />
                                <div>
                                    <span className={`type-badge ${category.type}`}>{category.typeName}</span>
                                    <h3 style={{ marginTop: '6px' }}>{category.title}</h3>
                                </div>
                            </div>

                            <ul className="skill-list">
                                {category.moves.map((m, j) => (
                                    <motion.li
                                        key={m.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 + j * 0.06, duration: 0.4 }}
                                    >
                                        <span className="skill-tm">TM{m.tm}</span> {m.name}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </Tilt>
                ))}
            </div>
        </section>
    );
}
