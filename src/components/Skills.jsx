import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';

const pokemonSprites = {
    charizard: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    pikachu: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    gyarados: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
    mewtwo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    bulbasaur: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    dragonite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
};

export default function Skills() {
    return (
        <section className="section skills-section" id="skills">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>⚡ Type Matchup Chart</span>
            </motion.h2>

            <div className="skills-grid">
                {skills.map((category, i) => (
                    <motion.div
                        key={category.type}
                        className={`skill-card ${category.type}`}
                        initial={{ opacity: 0, y: 50, rotateX: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: i * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="skill-card-header">
                            <motion.img
                                src={pokemonSprites[category.pokemon]}
                                alt={category.pokemon}
                                className="skill-pokemon"
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
                            {category.skills.map((skill, j) => (
                                <motion.li
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + j * 0.06, duration: 0.4 }}
                                >
                                    {skill}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
