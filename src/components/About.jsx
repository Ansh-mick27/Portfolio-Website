import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, stats } from '../data/portfolio';
import CountUp from './CountUp';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const fadeIn = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="section about-section" id="about">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>📋 Pokédex Entry</span>
            </motion.h2>

            <motion.div
                className="pokedex-frame"
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                }}
            >
                <div className="pokedex-inner">
                    <div className="pokedex-lights">
                        <div className="pokedex-light blue" />
                        <div className="pokedex-light red" />
                        <div className="pokedex-light green" />
                    </div>

                    <div className="pokedex-screen">
                        <div className="about-grid">
                            <motion.div
                                className="about-avatar-container"
                                variants={fadeIn}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <div className="about-avatar">
                                    <motion.img
                                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"
                                        alt="Lucario - Developer Avatar"
                                        style={{
                                            width: '75%',
                                            height: '75%',
                                            objectFit: 'contain',
                                            position: 'relative',
                                            zIndex: 2,
                                            filter: 'drop-shadow(0 4px 20px rgba(248, 208, 48, 0.3))',
                                        }}
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                className="about-text"
                                variants={fadeIn}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <h3>#{String(Math.floor(Math.random() * 900 + 100)).padStart(3, '0')} — {personalInfo.name}</h3>
                                <p>{personalInfo.bio}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    📍 {personalInfo.location} &nbsp;|&nbsp; 🎯 Trainer Level {personalInfo.trainerLevel} &nbsp;|&nbsp; ⚡ {personalInfo.trainerTitle}
                                </p>

                                <div className="about-stats">
                                    {stats.map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            className="stat-item"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                                        >
                                            <span className="stat-number">
                                                {isInView ? <CountUp end={stat.value} duration={2000} /> : 0}
                                            </span>
                                            <span className="stat-label">{stat.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
