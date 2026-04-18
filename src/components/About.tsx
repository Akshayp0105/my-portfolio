import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/* ── Animated count-up stat ──────────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) raw.set(target);
  }, [inView, target, raw]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const stats = [
  { number: 40, label: 'Projects Built', suffix: '+' },
  { number: 5,  label: 'Hardware Projects', suffix: '+' },
  { number: 200, label: 'Interviews Conducted', suffix: '+' },
  { number: 1,  label: 'Startup Founded', suffix: '' },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-28 px-6 md:px-12 lg:px-20"
      style={{ background: 'radial-gradient(ellipse at 60% 50%, #0d0d18 0%, #0a0a0f 70%)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          01 · About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-8 leading-tight">
              Building at the <br />
              <span className="gradient-text">intersection</span> of <br />
              design & code.
            </h2>
            <p className="text-white/70 font-inter leading-relaxed mb-6 max-w-md">
              I'm Akshay P — a 20-year-old startup founder, fullstack developer, and community
              builder from Kochi, Kerala. I turn ideas into products people actually use.
            </p>
            <p className="text-white/50 font-inter leading-relaxed max-w-md text-sm">
              Currently pursuing B.Tech CSE at Toc H Institute of Science & Technology (Graduating June 2027),
              while co-founding{' '}
              <span className="text-gold">Korvet Innovations</span> — a Govt. of Kerala recognized
              EdTech & business services startup.
            </p>

            <div className="mt-10 flex gap-6">
              <a
                href="https://github.com/Akshayp0105"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-accent-lime transition-colors duration-300 text-sm font-inter"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/akshay-p-6b889a288"
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-accent-purple transition-colors duration-300 text-sm font-inter"
              >
                LinkedIn ↗
              </a>
            </div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass card p-6 rounded-xl"
                whileHover={{ scale: 1.04, borderColor: 'rgba(200,255,0,0.2)' }}
                transition={{ delay: i * 0.08 }}
              >
                <div
                  className="font-space-grotesk font-bold mb-1"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--lime)' }}
                >
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-white/50 text-sm font-inter">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;