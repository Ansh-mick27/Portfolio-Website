import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { socialLinks } from '../data/portfolio';
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';

const iconMap = {
    github: <FiGithub />,
    linkedin: <FiLinkedin />,
    email: <FiMail />,
};

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, send to a backend/email service
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="section contact-section" id="contact" ref={ref}>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>📬 Pokémon PC — Send Message</span>
            </motion.h2>

            <motion.div
                className="contact-container"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="contact-pc-frame">
                    <div className="contact-pc-inner">
                        <div className="contact-pc-header">
                            <motion.img
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png"
                                alt="Pidgeot"
                                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                animate={{ x: [0, 5, 0], rotate: [0, 3, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <span>Bill's PC — Message System</span>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: '60px 20px',
                                }}
                            >
                                <motion.img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/225.png"
                                    alt="Delibird"
                                    style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto 20px' }}
                                    animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.75rem', color: 'var(--type-electric)' }}>
                                    Delibird delivered your message!
                                </p>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '10px', fontSize: '0.85rem' }}>
                                    I'll get back to you as soon as possible.
                                </p>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                        id="contact-name"
                                    />
                                    <label htmlFor="contact-name">Trainer Name</label>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                        id="contact-email"
                                    />
                                    <label htmlFor="contact-email">PokéMail Address</label>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder=" "
                                        required
                                        id="contact-message"
                                    />
                                    <label htmlFor="contact-message">Your Message</label>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="pokeball-btn contact-submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiSend /> Send via Pidgey
                                </motion.button>
                            </form>
                        )}

                        <div className="contact-social">
                            {socialLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-pokeball"
                                    title={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                >
                                    {iconMap[link.icon] || <FiMail />}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
