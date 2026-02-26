import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingPokemon from './components/FloatingPokemon';
import ScrollProgress from './components/ScrollProgress';
import SectionDivider from './components/SectionDivider';

export default function App() {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <FloatingPokemon />

            <main>
                <Hero />
                <SectionDivider />
                <About />
                <SectionDivider />
                <Skills />
                <SectionDivider />
                <Projects />
                <SectionDivider />
                <Experience />
                <SectionDivider />
                <Education />
                <SectionDivider />
                <Publications />
                <SectionDivider />
                <Certifications />
                <SectionDivider />
                <Achievements />
                <SectionDivider />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
