import { motion } from 'framer-motion';

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/Akshayp0105',
    hoverColor: '#c8ff00',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/akshay-p-6b889a288',
    hoverColor: '#6C63FF',
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:akshay1012005@gmail.com',
    hoverColor: '#ffffff',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const Contact = () => (
  <section
    id="contact"
    className="py-28 px-6 md:px-12 lg:px-20 min-h-screen flex flex-col items-center justify-center"
    style={{ background: 'radial-gradient(ellipse at 50% 80%, #0d0820 0%, #0a0a0f 60%)' }}
  >
    <div className="max-w-2xl mx-auto text-center w-full">
      <motion.p
        className="section-label mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        05 · Contact
      </motion.p>

      <motion.h2
        className="text-4xl md:text-6xl font-space-grotesk font-bold text-white leading-tight mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        Let's Build{' '}
        <span className="gradient-text">Something.</span>
      </motion.h2>

      <motion.p
        className="text-white/40 font-inter mb-16 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Open to collaborations, internships &amp; projects.
      </motion.p>

      {/* CTA email button */}
      <motion.a
        href="mailto:akshay1012005@gmail.com"
        className="inline-block px-10 py-4 border-2 border-accent-lime text-white
                   font-inter font-medium text-sm tracking-widest uppercase mb-14
                   hover:bg-accent-lime/10 transition-all duration-300 rounded-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
      >
        Say Hello ✉️
      </motion.a>

      {/* Social icons */}
      <motion.div
        className="flex justify-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        {links.map(({ label, href, hoverColor, icon }) => (
          <motion.a
            key={label}
            href={href}
            target={label !== 'Email' ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-white/50 transition-all duration-300"
            whileHover={{ color: hoverColor, scale: 1.2, y: -3 }}
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-white/20 font-inter text-sm mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        © 2025 Akshay P · Built with React, Three.js &amp; ☕
      </motion.p>
    </div>
  </section>
);

export default Contact;