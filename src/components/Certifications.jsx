import { motion } from 'framer-motion';
import { certifications } from '../data/portfolio';

const typeIcons = {
    fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
    psychic: '🔮', dragon: '🐉', normal: '⭐',
};

export default function Certifications() {
    return (
        <section className="section certifications-section" id="certifications">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>🏅 Badge Collection — Certifications</span>
            </motion.h2>

            <div className="cert-grid">
                {certifications.map((cert, i) => (
                    <motion.div
                        key={i}
                        className={`cert-badge-card ${cert.type}`}
                        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                            delay: i * 0.07,
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 200,
                        }}
                        whileHover={{
                            scale: 1.08,
                            rotate: [0, 2, -2, 0],
                            transition: { duration: 0.4 },
                        }}
                    >
                        <motion.div
                            className="cert-icon"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            <div className="cert-glow-ring" />
                        </motion.div>

                        <div className="cert-type-emoji">
                            {typeIcons[cert.type] || '⭐'}
                        </div>

                        <h4 className="cert-name">{cert.name}</h4>
                        <p className="cert-issuer">{cert.issuer}</p>

                        {cert.date && (
                            <span className="cert-date">{cert.date}</span>
                        )}

                        {cert.skills.length > 0 && (
                            <div className="cert-skills">
                                {cert.skills.map((skill, j) => (
                                    <span key={j} className={`type-badge ${cert.type}`}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
