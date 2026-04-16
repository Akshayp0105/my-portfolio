import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const StatCard = ({ number, label, delay }: { number: number; label: string; delay: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = number / 50;
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= number) {
            clearInterval(interval);
            return number;
          }
          return Math.ceil(prev + increment);
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [number, delay]);

  return (
    <motion.div
      className="glass p-6 rounded-lg text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="text-4xl font-space-grotesk font-bold text-accent-lime mb-2">
        {count}+
      </div>
      <div className="text-white/50 text-sm font-inter">
        {label}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section className="py-20 px-8 bg-gradient-radial from-bg-dark to-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-space-grotesk font-bold text-white mb-6">About Me</h2>
          <p className="text-white/80 font-inter leading-relaxed max-w-md">
            I'm Akshay P, a 20-year-old startup founder and fullstack developer from Kochi, Kerala.
            Passionate about building innovative solutions that make a difference. Currently leading
            multiple tech initiatives while pursuing excellence in software engineering.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <StatCard number={40} label="Projects" delay={0.1} />
          <StatCard number={5} label="Hardware" delay={0.2} />
          <StatCard number={200} label="Interviews" delay={0.3} />
          <StatCard number={1} label="Startup" delay={0.4} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;