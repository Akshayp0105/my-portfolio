import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    title: 'GasUllavidu',
    description: 'LPG cylinder sharing platform connecting households for cost-efficient gas sharing.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    tag: 'Social Impact',
    color: '#ff6b6b',
    link: 'https://github.com/Akshayp0105',
  },
  {
    title: 'E2S',
    description: 'Sponsorship marketplace bridging student events with corporate sponsors.',
    tech: ['Python', 'Django', 'PostgreSQL', 'REST API'],
    tag: 'EdTech',
    color: '#4ecdc4',
    link: 'https://github.com/Akshayp0105',
  },
  {
    title: 'FactoryScan',
    description: 'AI-powered fake review detector using ML classifiers and NLP pipeline.',
    tech: ['React', 'Python', 'scikit-learn', 'FastAPI'],
    tag: 'AI / ML',
    color: '#ffd16a',
    link: 'https://github.com/Akshayp0105',
  },
  {
    title: 'Gym Management',
    description: 'Full-featured SaaS for fitness centres — billing, attendance, and analytics.',
    tech: ['React', 'Node.js', 'MySQL', 'JWT'],
    tag: 'SaaS',
    color: '#6C63FF',
    link: 'https://github.com/Akshayp0105',
  },
  {
    title: 'Travel Booking App',
    description: 'Seamless travel planner with itinerary builder and real-time availability.',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    tag: 'SaaS',
    color: '#ff9ff3',
    link: 'https://github.com/Akshayp0105',
  },
  {
    title: 'Korvet Website',
    description: 'Corporate site for Korvet Innovations — our Govt.-recognised EdTech startup.',
    tech: ['React', 'Next.js', 'Tailwind', 'Framer'],
    tag: 'Branding',
    color: '#c8ff00',
    link: 'https://github.com/Akshayp0105',
  },
];

type Project = typeof projects[0];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    className="h-full"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: '-60px' }}
  >
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      glareEnable
      glareMaxOpacity={0.08}
      glareColor={project.color}
      glarePosition="all"
      glareBorderRadius="12px"
      className="h-full"
    >
      <div
        className="card glass rounded-xl p-6 h-full flex flex-col
                   hover:border-white/20 transition-all duration-300 group"
        data-cursor
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full rounded-full mb-5 transition-all duration-300 group-hover:shadow-lg"
          style={{
            background: project.color,
            boxShadow: `0 0 0 transparent`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${project.color}80`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 transparent`;
          }}
        />

        {/* Tag */}
        <span
          className="self-start text-xs font-inter px-3 py-1 rounded-full
                     bg-white/5 border border-white/10 text-white/60 mb-4"
        >
          {project.tag}
        </span>

        {/* Title */}
        <h3 className="text-xl font-space-grotesk font-semibold text-white mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/55 text-sm font-inter leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-white/8 text-white/70 text-xs rounded font-inter"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-inter transition-colors duration-300 flex items-center gap-1"
          style={{ color: project.color }}
        >
          View on GitHub <span className="text-base leading-none">↗</span>
        </a>
      </div>
    </Tilt>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          02 · Projects
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Featured Work
        </motion.h2>

        <motion.p
          className="text-white/40 font-inter mb-14 max-w-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
        >
          A selection of projects I've built — from AI tools to social-impact platforms.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/Akshayp0105"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-inter text-sm
                       transition-all duration-300 group"
            style={{ color: 'var(--lime)' }}
          >
            <span>40+ more on GitHub</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;