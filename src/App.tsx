import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './style.css';

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="noise-bg min-h-screen font-inter" style={{ background: 'var(--bg)' }}>
      {/* Skip to content */}
      <a href="#hero" className="skip-link">Skip to content</a>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader */}
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass"
        initial={{ y: -80, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
          {/* Logo */}
          <a
            href="#hero"
            className="font-space-grotesk font-extrabold text-lg leading-none"
            style={{ color: 'var(--lime)' }}
          >
            AP
          </a>

          {/* Links */}
          <div className="hidden sm:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-inter text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:akshay1012005@gmail.com"
            className="text-xs font-inter text-white/60 hover:text-accent-lime
                       border border-white/10 hover:border-accent-lime/40
                       px-4 py-2 rounded transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </motion.nav>

      {/* Main content — only renders after preloader */}
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;