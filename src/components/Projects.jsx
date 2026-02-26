import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const pokemonSprites = {
    charizard: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    bulbasaur: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    gyarados: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
    dragonite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
};

export default function Projects() {
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (id) => {
        setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="section projects-section" id="projects">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>🎴 Battle Cards</span>
            </motion.h2>

            <div className="projects-grid">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className={`project-card ${flippedCards[project.id] ? 'flipped' : ''}`}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: i * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        onClick={() => toggleFlip(project.id)}
                    >
                        <div className="project-card-inner">
                            {/* Front */}
                            <div className="project-card-front">
                                <div className="card-header">
                                    <motion.img
                                        src={pokemonSprites[project.pokemon]}
                                        alt={project.pokemon}
                                        className="card-pokemon"
                                        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
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
                                    {project.attacks.map(attack => (
                                        <div key={attack.name} className="attack">
                                            <span className="attack-name">⚔️ {attack.name}</span>
                                            <span className="attack-damage">{attack.damage}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="card-tech">
                                    {project.tech.map(t => (
                                        <span key={t} className={`type-badge ${project.type}`}>{t}</span>
                                    ))}
                                </div>

                                <span className="card-flip-hint">Click to flip →</span>
                            </div>

                            {/* Back */}
                            <div className="project-card-back">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>

                                <div className="card-links">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="github-link"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <FiGithub /> GitHub
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="live-link"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <FiExternalLink /> Live Demo
                                        </a>
                                    )}
                                </div>

                                <span className="card-back-hint" onClick={() => toggleFlip(project.id)}>
                                    ← Click to flip back
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
