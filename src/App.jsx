import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
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
                <Contact />
            </main>

            <Footer />
        </>
    );
}
