import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Tilt from './fx/Tilt';

const art = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const pokemonSprites = {
    charizard: art(6),
    bulbasaur: art(1),
    gyarados: art(130),
    dragonite: art(149),
    mewtwo: art(150),
    pikachu: art(25),
    alakazam: art(65),
    rotom: art(479),
    eevee: art(133),
    porygon: art(137),
    gengar: art(94),
};

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'web', label: '🌐 Web' },
    { key: 'app', label: '📱 Apps' },
    { key: 'tool', label: '🛠️ Tools' },
    { key: 'academic', label: '🎓 Academic' },
];

export default function Projects() {
    const [flippedCards, setFlippedCards] = useState({});
    const [filter, setFilter] = useState('all');

    const toggleFlip = (id) => {
        setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const visible = useMemo(
        () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
        [filter]
    );

    const counts = useMemo(() => {
        const c = { all: projects.length };
        projects.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1));
        return c;
    }, []);

    return (
        <section className="section projects-section" id="projects">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20, rotateX: -60 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ transformPerspective: 800 }}
            >
                <span>🎴 Battle Cards</span>
            </motion.h2>

            <div className="project-filters" role="tablist" aria-label="Filter projects">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        role="tab"
                        aria-selected={filter === f.key}
                        className={`project-filter ${filter === f.key ? 'active' : ''}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {filter === f.key && (
                            <motion.span
                                layoutId="filter-pill"
                                className="project-filter-pill"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span className="project-filter-text">
                            {f.label} <em>{counts[f.key] || 0}</em>
                        </span>
                    </button>
                ))}
            </div>

            <motion.div className="projects-grid" layout>
                <AnimatePresence mode="popLayout">
                    {visible.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, rotateY: -80, z: -200, y: 40 }}
                            animate={{ opacity: 1, rotateY: 0, z: 0, y: 0 }}
                            exit={{ opacity: 0, rotateY: 80, z: -200, scale: 0.8 }}
                            transition={{ delay: Math.min(i, 8) * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformPerspective: 1200 }}
                        >
                            <Tilt max={16} className="tilt-card">
                                <div
                                    className={`project-card ${flippedCards[project.id] ? 'flipped' : ''}`}
                                    onClick={() => toggleFlip(project.id)}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={!!flippedCards[project.id]}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleFlip(project.id))}
                                >
                                    <div className="project-card-inner">
                                        {/* Front */}
                                        <div className={`project-card-front type-${project.type}`}>
                                            {project.featured && <span className="card-ribbon">★ NEW</span>}
                                            <div className="card-header">
                                                <motion.img
                                                    src={pokemonSprites[project.pokemon]}
                                                    alt={project.pokemon}
                                                    loading="lazy"
                                                    className="card-pokemon parallax-sprite"
                                                    style={{ width: '78px', height: '78px', objectFit: 'contain' }}
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                                />
                                                <div className="card-hp">
                                                    <span>HP</span>
                                                    <div className="hp-bar-container">
                                                        <div
                                                            className={`hp-bar ${project.hp >= 80 ? 'high' : project.hp >= 50 ? 'mid' : 'low'}`}
                                                            style={{ width: `${project.hp}%` }}
                                                        />
                                                    </div>
                                                    <span>{project.hp}</span>
                                                </div>
                                            </div>

                                            <h3 className="card-name">{project.name}</h3>
                                            <p className="card-desc">{project.description}</p>

                                            <div className="card-attacks">
                                                {project.attacks.map((attack) => (
                                                    <div key={attack.name} className="attack">
                                                        <span className="attack-name">⚔️ {attack.name}</span>
                                                        <span className="attack-damage">{attack.damage}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="card-tech">
                                                {project.tech.map((t) => (
                                                    <span key={t} className={`type-badge ${project.type}`}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <span className="card-flip-hint">Click to flip →</span>
                                        </div>

                                        {/* Back */}
                                        <div className="project-card-back">
                                            <h3>{project.name}</h3>
                                            <p>{project.description}</p>

                                            <div className="card-links">
                                                {project.github ? (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="github-link"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`View ${project.name} source code on GitHub`}
                                                    >
                                                        <FiGithub aria-hidden="true" /> GitHub
                                                    </a>
                                                ) : (
                                                    <span className="card-private">🔒 Academic project</span>
                                                )}
                                                {project.live && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="live-link"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`View live demo of ${project.name}`}
                                                    >
                                                        <FiExternalLink aria-hidden="true" /> Live Demo
                                                    </a>
                                                )}
                                            </div>

                                            <span className="card-back-hint">← Click to flip back</span>
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <motion.a
                href="https://github.com/Ansh-mick27"
                target="_blank"
                rel="noopener noreferrer"
                className="pokeball-btn secondary projects-more"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <FiGithub aria-hidden="true" /> See everything on GitHub
            </motion.a>
        </section>
    );
}
