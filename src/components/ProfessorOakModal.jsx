import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from './SoundManager';

const oakImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png';
// Using Snorlax as a fun stand-in since there's no official Oak sprite on PokeAPI
// The real star is the text animation

const messages = [
    "Hello there! Welcome to the world of Anshul's portfolio!",
    "My name is OAK! People call me the Pokémon Professor!",
    "This world is inhabited by creatures called PROJECTS...",
    "Some are born from code, others from pure creativity!",
    "Are you ready to explore? Let's GO!"
];

export default function ProfessorOakModal() {
    const [show, setShow] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const { playSound } = useSounds();

    useEffect(() => {
        const visited = localStorage.getItem('oakVisited');
        if (!visited) {
            // Small delay so the page loads first
            const timer = setTimeout(() => setShow(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // Typing effect
    useEffect(() => {
        if (!show) return;
        const currentMessage = messages[messageIndex];
        if (!currentMessage) return;

        if (displayText.length < currentMessage.length) {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setDisplayText(currentMessage.slice(0, displayText.length + 1));
            }, 35);
            return () => clearTimeout(timer);
        } else {
            setIsTyping(false);
        }
    }, [displayText, messageIndex, show]);

    const handleNext = useCallback(() => {
        playSound('click');
        if (messageIndex < messages.length - 1) {
            setMessageIndex(prev => prev + 1);
            setDisplayText('');
            setIsTyping(true);
        } else {
            // Dismiss
            localStorage.setItem('oakVisited', 'true');
            setShow(false);
        }
    }, [messageIndex, playSound]);

    const handleSkip = useCallback(() => {
        playSound('click');
        localStorage.setItem('oakVisited', 'true');
        setShow(false);
    }, [playSound]);

    // Click to skip typing or advance
    const handleTextboxClick = useCallback(() => {
        const currentMessage = messages[messageIndex];
        if (isTyping) {
            // Complete the current message
            setDisplayText(currentMessage);
            setIsTyping(false);
        } else {
            handleNext();
        }
    }, [isTyping, messageIndex, handleNext]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="oak-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="oak-modal"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    >
                        <div className="oak-sprite-container">
                            <motion.img
                                src={oakImage}
                                alt="Professor Oak"
                                className="oak-sprite"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <div className="oak-name-tag">Prof. Oak</div>
                        </div>

                        <div className="oak-textbox" onClick={handleTextboxClick}>
                            <p className="oak-text">
                                {displayText}
                                <span className="oak-cursor">
                                    {isTyping ? '▌' : ''}
                                </span>
                            </p>
                            {!isTyping && (
                                <motion.span
                                    className="oak-continue"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    {messageIndex < messages.length - 1 ? '▼ Click to continue' : '▼ Click to start!'}
                                </motion.span>
                            )}
                        </div>

                        <div className="oak-progress">
                            {messages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`oak-dot ${i <= messageIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>

                        <button className="oak-skip" onClick={handleSkip}>
                            Skip ⏭️
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
