import { motion } from 'framer-motion';
import { education } from '../data/portfolio';

const pokemonSprites = {
    mewtwo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    alakazam: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png',
    lucario: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    pikachu: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    eevee: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
};

export default function Education() {
    return (
        <section className="section education-section" id="education">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>🎓 Pokémon Academy — Training Log</span>
            </motion.h2>

            <div className="education-grid">
                {education.map((edu, i) => (
                    <motion.div
                        key={i}
                        className="edu-card glass-card"
                        initial={{ opacity: 0, y: 50, rotateY: -15 }}
                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                            delay: i * 0.15,
                            duration: 0.7,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                        whileHover={{ scale: 1.03, y: -8 }}
                    >
                        {/* Pokémon mascot */}
                        <div className="edu-pokemon-wrap">
                            <motion.img
                                src={pokemonSprites[edu.pokemon]}
                                alt={edu.pokemon}
                                className="edu-pokemon"
                                animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.4,
                                }}
                            />
                        </div>

                        {/* Badge ribbon */}
                        <div className="edu-ribbon">
                            <span className="edu-period">{edu.period}</span>
                        </div>

                        <h3 className="edu-degree">{edu.degree}</h3>
                        <p className="edu-institution">{edu.institution}</p>

                        {edu.score && (
                            <div className="edu-score-bar">
                                <span className="edu-score-label">Score</span>
                                <div className="edu-score-track">
                                    <motion.div
                                        className="edu-score-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${parseInt(edu.score) || 75}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + i * 0.15, duration: 1.2, ease: 'easeOut' }}
                                    />
                                </div>
                                <span className="edu-score-value">{edu.score}</span>
                            </div>
                        )}

                        {edu.dissertation && (
                            <div className="edu-dissertation">
                                <span className="edu-diss-label">📜 Dissertation</span>
                                <p>{edu.dissertation}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
