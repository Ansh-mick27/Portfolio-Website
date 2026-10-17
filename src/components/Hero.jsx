import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import useMagnetic from './fx/useMagnetic';

const COMMANDS = [
    { label: 'FIGHT', sub: 'Projects', href: '#projects', type: 'fire' },
    { label: 'BAG', sub: 'Tech moves', href: '#skills', type: 'electric' },
    { label: 'POKéMON', sub: 'Journey', href: '#experience', type: 'grass' },
    { label: 'RUN', sub: 'Contact', href: '#contact', type: 'water' },
];

function BattleIntro() {
    // Classic encounter wipe: stripes slide away to reveal the battle
    const [done, setDone] = useState(false);
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const t = setTimeout(() => setDone(true), reduce ? 0 : 1500);
        return () => clearTimeout(t);
    }, []);
    if (done) return null;
    return (
        <div className="battle-intro-wipe" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                    key={i}
                    className="wipe-bar"
                    initial={{ x: '0%' }}
                    animate={{ x: i % 2 ? '105%' : '-105%' }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
                />
            ))}
            <motion.span
                className="wipe-flash"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
}

function BattleHud() {
    return (
        <motion.div
            className="battle-hud"
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            aria-hidden="true"
        >
            <div className="battle-hud-top">
                <span className="battle-hud-name">LUCARIO ♂</span>
                <span className="battle-hud-lv">Lv99</span>
            </div>
            <div className="battle-hud-hp">
                <span>HP</span>
                <div className="battle-hud-bar">
                    <motion.div
                        className="battle-hud-fill"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.7, duration: 1.1, ease: 'easeOut' }}
                    />
                </div>
            </div>
            <div className="battle-hud-types">
                <span className="type-badge fighting">Fighting</span>
                <span className="type-badge steel">Steel</span>
            </div>
            <div className="battle-hud-exp">
                <span>EXP</span>
                <div className="battle-hud-expbar">
                    <motion.div
                        className="battle-hud-expfill"
                        initial={{ width: '0%' }}
                        animate={{ width: '82%' }}
                        transition={{ delay: 2.2, duration: 1.2 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function SplitName({ text }) {
    return (
        <h1 className="hero-name split" aria-label={text}>
            {text.split(' ').map((word, w) => (
                <span key={w} className="hero-word" aria-hidden="true">
                    {word.split('').map((ch, i) => (
                        <motion.span
                            key={i}
                            className="hero-letter"
                            style={{ '--i': w * 6 + i }}
                            initial={{ rotateX: -95, y: 40, opacity: 0, z: -80 }}
                            animate={{ rotateX: 0, y: 0, opacity: 1, z: 0 }}
                            transition={{ delay: 0.35 + (w * 6 + i) * 0.055, duration: 0.9, ease: [0.22, 1.2, 0.36, 1] }}
                            whileHover={{ y: -10, rotateY: 25, scale: 1.15, transition: { duration: 0.25 } }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </span>
            ))}
        </h1>
    );
}

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const primaryBtn = useMagnetic(0.12);
    const secondaryBtn = useMagnetic(0.12);

    // Typing effect
    useEffect(() => {
        const currentRole = personalInfo.roles[roleIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(currentRole.slice(0, displayText.length + 1));
                if (displayText === currentRole) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setDisplayText(currentRole.slice(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    // Whole hero block tilts gently in 3D with the mouse
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 120, damping: 18 });
    const ry = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 120, damping: 18 });

    // Scroll away: content sinks back into 3D space
    const { scrollY } = useScroll();
    const sinkZ = useTransform(scrollY, [0, 700], [0, -260]);
    const sinkRot = useTransform(scrollY, [0, 700], [0, 22]);
    const sinkOpacity = useTransform(scrollY, [0, 550], [1, 0]);

    const onMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40, rotateX: -30 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } },
    };

    return (
        <section
            className="hero"
            id="hero"
            onPointerMove={onMove}
            onPointerLeave={() => {
                mx.set(0);
                my.set(0);
            }}
        >
            <BattleIntro />
            <div className="hero-bg">
                <div className="stars" />
            </div>
            <BattleHud />

            <motion.div className="hero-stage" style={{ z: sinkZ, rotateX: sinkRot, opacity: sinkOpacity }}>
                <motion.div className="hero-content" style={{ rotateX: rx, rotateY: ry }}>
                    <motion.p
                        className="battle-intro"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 0.9, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                    >
                        ⚔️ A wild developer appeared!
                    </motion.p>

                    <SplitName text={personalInfo.name} />

                    <motion.div variants={stagger} initial="hidden" animate="visible" className="hero-rest">
                        <motion.div className="hero-role" variants={fadeUp}>
                            {'> '}
                            {displayText}
                            <span className="cursor">_</span>
                        </motion.div>

                        <motion.div className="rpg-textbox" variants={fadeUp}>
                            <p>{personalInfo.bio}</p>
                        </motion.div>

                        <motion.nav className="battle-menu" variants={fadeUp} aria-label="Quick navigation">
                            <p className="battle-menu-prompt">
                                <span>
                                What will{' '}
                                <strong>{personalInfo.name.split(' ')[0].toUpperCase()}</strong>{' '}
                                do?
                                </span>
                            </p>
                            <div className="battle-menu-grid">
                                {COMMANDS.map((c, i) => (
                                    <a
                                        key={c.label}
                                        ref={i === 0 ? primaryBtn : i === 3 ? secondaryBtn : undefined}
                                        href={c.href}
                                        className={`battle-cmd ${c.type}`}
                                    >
                                        <span className="battle-cmd-arrow" aria-hidden="true">▶</span>
                                        <span className="battle-cmd-label">{c.label}</span>
                                        <span className="battle-cmd-sub">{c.sub}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.nav>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.a
                href="#about"
                className="scroll-cue"
                aria-label="Scroll down"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
            >
                <span className="scroll-cue-mouse">
                    <span className="scroll-cue-wheel" />
                </span>
                <span className="scroll-cue-label">Scroll</span>
            </motion.a>
        </section>
    );
}
