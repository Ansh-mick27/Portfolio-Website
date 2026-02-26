import { motion } from 'framer-motion';

export default function SectionDivider() {
    return (
        <div className="section-divider">
            <div className="divider-line" />
            <motion.div
                className="divider-pokeball"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}
