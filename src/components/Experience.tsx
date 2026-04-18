import { motion } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    role: 'Tech Lead',
    company: 'TinkerHub Toc H',
    type: 'Community',
    duration: '2023 – Present',
    description:
      'Driving technical initiatives, organising hackathons, and mentoring 100+ student developers across the campus chapter.',
    special: false,
    accent: '#4ecdc4',
  },
  {
    role: 'Founder',
    company: 'CodeCatalyst Toc H',
    type: 'Community',
    duration: '2024 – Present',
    description:
      "Founded the college's premier dev community — running workshops, buildathons, and peer learning sessions.",
    special: false,
    accent: '#c8ff00',
  },
  {
    role: 'Software Intern',
    company: 'MedTourEasy',
    type: 'Industry',
    duration: '2023',
    description:
      'Built healthcare tourism features, improved UX flows, and shipped production-ready React components.',
    special: false,
    accent: '#6C63FF',
  },
  {
    role: 'Co-Founder & CTO',
    company: 'Korvet Innovations',
    type: 'Startup',
    duration: '2023 – Present',
    description:
      'Leading product & engineering at our EdTech & business-services startup. Partners: T.I.M.E, Clifton\'s. Govt. of Kerala recognised.',
    special: true,
    accent: '#ffd700',
  },
];

type Exp = typeof experiences[0];

const ExpCard = ({ exp, index }: { exp: Exp; index: number }) => {
  if (exp.special) {
    return (
      <motion.div
        className="exp-card korvet-card min-w-[300px] max-w-[320px] p-6"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        viewport={{ once: true }}
        data-cursor
      >
        {/* Govt badge */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="text-xs font-inter px-3 py-1 rounded-full border"
            style={{
              color: 'var(--gold)',
              borderColor: 'rgba(255,215,0,0.3)',
              background: 'rgba(255,215,0,0.06)',
            }}
          >
            🏛 Govt. Recognised
          </span>
        </div>
        <CardBody exp={exp} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="exp-card glass rounded-xl min-w-[300px] max-w-[320px] p-6"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: `${exp.accent}40` }}
      data-cursor
    >
      <CardBody exp={exp} />
    </motion.div>
  );
};

const CardBody = ({ exp }: { exp: Exp }) => (
  <>
    <span
      className="text-xs font-inter uppercase tracking-widest mb-3 block"
      style={{ color: exp.accent, opacity: 0.8 }}
    >
      {exp.type}
    </span>
    <h3 className="text-lg font-space-grotesk font-semibold text-white mb-1 leading-snug">
      {exp.role}
    </h3>
    <p className="font-inter mb-1" style={{ color: exp.accent, opacity: 0.9, fontSize: '0.95rem' }}>
      {exp.company}
    </p>
    <p className="text-white/40 text-sm font-inter mb-4">{exp.duration}</p>
    <p className="text-white/65 text-sm font-inter leading-relaxed max-w-[260px]">
      {exp.description}
    </p>
  </>
);

const Experience = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      className="py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, #0d0d1a 0%, #0a0a0f 70%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          03 · Experience
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Journey So Far
        </motion.h2>

        <motion.p
          className="text-white/40 font-inter mb-14 max-w-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
        >
          Roles, communities, and ventures that shaped who I am.
        </motion.p>

        {/* Timeline axis */}
        <div className="relative">
          <div
            className="absolute top-1/2 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(108,99,255,0.4) 10%, rgba(200,255,0,0.4) 90%, transparent)',
            }}
          />

          {/* Horizontal scroll track */}
          <div ref={trackRef} className="exp-track py-10">
            {experiences.map((exp, i) => (
              <ExpCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs font-inter mt-2 flex items-center gap-1">
          <span>←</span> Scroll to explore <span>→</span>
        </p>
      </div>
    </section>
  );
};

export default Experience;