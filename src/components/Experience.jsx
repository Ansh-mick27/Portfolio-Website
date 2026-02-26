import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';

const badgeEmojis = {
    boulder: '🪨',
    thunder: '⚡',
    rainbow: '🌈',
    marsh: '🔮',
    soul: '❤️‍🔥',
    volcano: '🌋',
    earth: '🌍',
    cascade: '💧',
};

const pokemonSprites = {
    lucario: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    raichu: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
    eevee: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
};

export default function Experience() {
    return (
        <section className="section experience-section" id="experience">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>🏅 Gym Badge Journey</span>
            </motion.h2>

            <div className="timeline">
                {experience.map((exp, i) => (
                    <motion.div
                        key={exp.id}
                        className="timeline-item"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ delay: i * 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <motion.div
                            className="timeline-dot"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 + 0.3, type: 'spring', stiffness: 300 }}
                        />

                        <div className="timeline-content">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <motion.div
                                    className="timeline-badge"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    {badgeEmojis[exp.badge] || '🏆'}
                                </motion.div>
                                <motion.img
                                    src={pokemonSprites[exp.pokemon]}
                                    alt={exp.pokemon}
                                    style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                                />
                            </div>

                            <span className="timeline-period">{exp.period}</span>
                            <h3 className="timeline-role">{exp.role}</h3>
                            <p className="timeline-company">{exp.company}</p>
                            <p className="timeline-desc">{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
