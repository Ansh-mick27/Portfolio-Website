import { createContext, useContext, useState, useCallback, useRef } from 'react';

const SoundContext = createContext({ muted: true, toggleMute: () => {}, playSound: () => {} });

export function useSounds() {
    return useContext(SoundContext);
}

// 8-bit sound generator using Web Audio API
function createAudioContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

export default function SoundManager({ children }) {
    const [muted, setMuted] = useState(true);
    const audioCtxRef = useRef(null);

    const getCtx = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = createAudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
    }, []);

    const playSound = useCallback((type = 'hover') => {
        if (muted) return;
        try {
            const ctx = getCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            switch (type) {
                case 'hover': {
                    // Short high-pitched blip
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(880, now);
                    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.05);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                    break;
                }
                case 'click': {
                    // Pokéball catch sound — descending
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(1200, now);
                    osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                    break;
                }
                case 'section': {
                    // Brief ascending chime
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
                    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.2);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                    break;
                }
                case 'hatch': {
                    // Hatching fanfare
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(523, now);
                    osc.frequency.setValueAtTime(659, now + 0.1);
                    osc.frequency.setValueAtTime(784, now + 0.2);
                    osc.frequency.setValueAtTime(1047, now + 0.3);
                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                    osc.start(now);
                    osc.stop(now + 0.5);
                    break;
                }
                case 'toggle': {
                    // Theme switch whoosh
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300, now);
                    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
                    osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);
                    gain.gain.setValueAtTime(0.07, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                    break;
                }
                default: {
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(660, now);
                    gain.gain.setValueAtTime(0.06, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                    osc.start(now);
                    osc.stop(now + 0.1);
                }
            }
        } catch (e) {
            // Silently fail if audio isn't available
        }
    }, [muted, getCtx]);

    const toggleMute = useCallback(() => {
        setMuted(prev => {
            if (prev) {
                // Turning sound on — init context
                try { getCtx(); } catch (e) { /* */ }
            }
            return !prev;
        });
    }, [getCtx]);

    return (
        <SoundContext.Provider value={{ muted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}
