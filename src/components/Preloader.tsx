import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const DURATION = 2500; // ms

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(Math.round(pct));

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Hold for 300ms then curtain up
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onComplete, 700);
        }, 300);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          id="preloader"
          key="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* AP logo */}
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(64px, 12vw, 120px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #c8ff00, #6C63FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              marginBottom: '3rem',
              perspective: 800,
            }}
          >
            AP
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: 'min(320px, 80vw)',
              height: '2px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '1px',
              overflow: 'hidden',
              marginBottom: '1rem',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #6C63FF, #c8ff00)',
                borderRadius: '1px',
                width: `${progress}%`,
                transition: 'width 0.08s linear',
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Loading {progress}%
          </p>
        </motion.div>
      ) : (
        /* Curtain wipe upward */
        <motion.div
          key="curtain"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#000', pointerEvents: 'none' }}
        />
      )}
    </AnimatePresence>
  );
};

export default Preloader;
