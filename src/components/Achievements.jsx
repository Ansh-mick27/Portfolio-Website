import { motion } from 'framer-motion';
import { achievements } from '../data/portfolio';

const typeColors = {
    patent: 'var(--type-dragon)',
    course: 'var(--type-electric)',
    project: 'var(--type-fire)',
    exam: 'var(--type-psychic)',
    training: 'var(--type-grass)',
    seminar: 'var(--type-water)',
    competition: 'var(--type-fighting)',
    conference: 'var(--type-ice)',
};

export default function Achievements() {
    return (
        <section className="section achievements-section" id="achievements">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>🏆 Hall of Fame — Achievements</span>
            </motion.h2>

            <div className="achieve-grid">
                {achievements.map((item, i) => (
                    <motion.div
                        key={i}
                        className="achieve-card"
                        style={{ '--achieve-color': typeColors[item.type] || 'var(--type-normal)' }}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                            delay: i * 0.08,
                            duration: 0.5,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                        whileHover={{
                            scale: 1.05,
                            y: -6,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <motion.span
                            className="achieve-icon"
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.2,
                            }}
                        >
                            {item.icon}
                        </motion.span>

                        <p className="achieve-text">{item.text}</p>

                        <div className="achieve-sparkle">
                            {[...Array(3)].map((_, j) => (
                                <motion.span
                                    key={j}
                                    className="sparkle-dot"
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: j * 0.6 + i * 0.1,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
