import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Publications from './components/Publications';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingPokemon from './components/FloatingPokemon';
import ScrollProgress from './components/ScrollProgress';
import SectionDivider from './components/SectionDivider';
import SoundManager from './components/SoundManager';
import ScrollToTop from './components/ScrollToTop';
import ProfessorOakModal from './components/ProfessorOakModal';
import EggHatchEasterEgg from './components/EggHatchEasterEgg';
import TypeParticles from './components/TypeParticles';
import PokeballTransition from './components/PokeballTransition';
import PokedexScanEffect from './components/PokedexScanEffect';

export default function App() {
    return (
        <SoundManager>
            <ScrollProgress />
            <Navbar />
            <FloatingPokemon />
            <ProfessorOakModal />
            <EggHatchEasterEgg />
            <ScrollToTop />

            <main>
                <div style={{ position: 'relative' }}>
                    <TypeParticles type="electric" />
                    <Hero />
                </div>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="psychic" />
                            <About />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="fire" />
                            <Skills />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="dragon" />
                            <Projects />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="fighting" />
                            <Experience />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="grass" />
                            <Education />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="psychic" />
                            <Publications />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="electric" />
                            <Certifications />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="fire" />
                            <Achievements />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>

                <SectionDivider />

                <PokedexScanEffect>
                    <PokeballTransition delay={0.1}>
                        <div style={{ position: 'relative' }}>
                            <TypeParticles type="water" />
                            <Contact />
                        </div>
                    </PokeballTransition>
                </PokedexScanEffect>
            </main>

            <Footer />
        </SoundManager>
    );
}
