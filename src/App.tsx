import React, { useState, useEffect, Suspense, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Logo3D from './components/Logo3D';
import './style.css';

const About = React.lazy(() => import('./components/About'));
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Skills = React.lazy(() => import('./components/Skills'));
const Contact = React.lazy(() => import('./components/Contact'));

const NAV_ITEMS = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);

  // 🥚 Easter egg #4 — type "korvet" anywhere to trigger founder mode
  const [korvetActive, setKorvetActive] = useState(false);
  const typedRef = useRef('');
  const korvetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const SECRET = 'korvet';
    const handleKey = (e: KeyboardEvent) => {
      // Don't fire if user is typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      typedRef.current = (typedRef.current + e.key).slice(-SECRET.length);
      if (korvetTimer.current) clearTimeout(korvetTimer.current);
      korvetTimer.current = setTimeout(() => { typedRef.current = ''; }, 1500);
      if (typedRef.current.toLowerCase() === SECRET) {
        typedRef.current = '';
        setKorvetActive(true);
        document.body.classList.add('korvet-mode');
        setTimeout(() => {
          setKorvetActive(false);
          document.body.classList.remove('korvet-mode');
        }, 3000);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollWidth((scrollY / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="noise-bg min-h-screen font-inter" style={{ background: 'var(--bg)' }}>
      {/* 🥚 Easter egg #4 — "korvet" toast */}
      <AnimatePresence>
        {korvetActive && (
          <motion.div
            key="korvet-toast"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '2.5rem',
              right: '2rem',
              zIndex: 99998,
              background: 'rgba(10,10,15,0.97)',
              border: '1px solid rgba(255,215,0,0.45)',
              borderRadius: '10px',
              padding: '12px 18px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              color: '#ffd700',
              boxShadow: '0 0 24px rgba(255,215,0,0.18)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🏛</span>
            <span>
              <strong>Korvet Innovations</strong> — Founder mode ON
              <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,215,0,0.5)', marginTop: '2px' }}>
                GOI recognised · EdTech · May 2025 – Present
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          height: '2px', 
          background: '#c8ff00', 
          width: `${scrollWidth}%`, 
          zIndex: 100000, 
          transition: 'width 0.1s ease-out' 
        }} 
      />

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
            className="flex items-center justify-center relative"
            aria-label="Home"
          >
            <Logo3D />
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
        <Suspense fallback={<div className="h-32 flex items-center justify-center text-white/50 text-sm">Loading...</div>}>
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;