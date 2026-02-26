import { motion } from 'framer-motion';
import { socialLinks } from '../data/portfolio';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const iconMap = {
    github: <FiGithub />,
    linkedin: <FiLinkedin />,
    email: <FiMail />,
};

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate grass blades
    const grassBlades = Array.from({ length: 40 }, (_, i) => (
        <div
            key={i}
            className="grass-blade"
            style={{ animationDelay: `${(i * 0.1) % 2}s` }}
        />
    ));

    return (
        <footer className="footer">
            <div className="footer-grass">
                {grassBlades}
            </div>

            <motion.div
                className="footer-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="footer-pokeballs">
                    {socialLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-pokeball-link"
                            title={link.name}
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {iconMap[link.icon] || <FiMail />}
                        </motion.a>
                    ))}
                </div>

                <p className="footer-text">
                    Made with <span className="heart">❤️</span> and Rare Candies
                    <br />
                    © {new Date().getFullYear()} Anshul Oza — Gotta Catch 'Em All!
                </p>

                <motion.button
                    className="back-to-top"
                    onClick={scrollToTop}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiArrowUp /> Back to Top
                </motion.button>
            </motion.div>
        </footer>
    );
}
