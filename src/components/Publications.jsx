import { motion } from 'framer-motion';
import { publications } from '../data/portfolio';

const pokemonSprites = {
    dragonite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    mewtwo: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    alakazam: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png',
    lucario: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
};

const typeLabel = {
    international: { label: '🌍 International Journal', color: 'var(--type-dragon)' },
    book_chapter: { label: '📖 Book Chapter', color: 'var(--type-psychic)' },
};

export default function Publications() {
    return (
        <section className="section publications-section" id="publications">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span>📚 Pokédex Research Log</span>
            </motion.h2>

            <div className="pub-list">
                {publications.map((pub, i) => (
                    <motion.div
                        key={i}
                        className="pub-card glass-card"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                            delay: i * 0.15,
                            duration: 0.7,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                        whileHover={{ x: 10, boxShadow: '0 0 30px rgba(112, 56, 248, 0.2)' }}
                    >
                        <div className="pub-pokemon-wrap">
                            <motion.img
                                src={pokemonSprites[pub.pokemon]}
                                alt={pub.pokemon}
                                className="pub-pokemon"
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.3,
                                }}
                            />
                        </div>

                        <div className="pub-content">
                            <span
                                className="pub-type-label"
                                style={{ color: typeLabel[pub.type]?.color }}
                            >
                                {typeLabel[pub.type]?.label}
                            </span>

                            <h3 className="pub-title">"{pub.title}"</h3>
                            <p className="pub-authors">{pub.authors}</p>
                            <p className="pub-journal">
                                <em>{pub.journal}</em>
                                {pub.pages && <>, {pub.pages}</>}
                            </p>
                            <div className="pub-meta">
                                <span className="pub-date">📅 {pub.date}</span>
                                {pub.isbn && <span className="pub-isbn">ISBN: {pub.isbn}</span>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
