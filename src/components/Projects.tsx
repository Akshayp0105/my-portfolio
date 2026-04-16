import { motion } from 'framer-motion';

const projects = [
  {
    title: 'GasUllavidu',
    description: 'Revolutionary gas delivery platform',
    tech: ['React', 'Node.js', 'MongoDB'],
    tag: 'Social Impact',
    color: '#ff6b6b'
  },
  {
    title: 'E2S',
    description: 'Educational technology solution',
    tech: ['Python', 'Django', 'PostgreSQL'],
    tag: 'EdTech',
    color: '#4ecdc4'
  },
  {
    title: 'FactoryScan',
    description: 'Industrial automation system',
    tech: ['React', 'Python', 'IoT'],
    tag: 'AI',
    color: '#ffd16a'
  },
  {
    title: 'Gym Management System',
    description: 'Comprehensive fitness center management',
    tech: ['React', 'Node.js', 'MySQL'],
    tag: 'SaaS',
    color: '#6C63FF'
  },
  {
    title: 'Travel Booking App',
    description: 'Seamless travel planning platform',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    tag: 'SaaS',
    color: '#ff9ff3'
  },
  {
    title: 'Korvet Website',
    description: 'Corporate website for Korvet Innovations',
    tech: ['React', 'Next.js', 'Tailwind'],
    tag: 'SaaS',
    color: '#c8ff00'
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.div
    className="glass p-6 rounded-lg hover:scale-105 hover:border-white/20 transition-all duration-300"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <div
      className="h-1 rounded-full mb-4"
      style={{ backgroundColor: project.color }}
    />
    <h3 className="text-xl font-space-grotesk font-semibold text-white mb-2">
      {project.title}
    </h3>
    <p className="text-white/60 text-sm mb-4">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.tech.map((tech) => (
        <span
          key={tech}
          className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded"
        >
          {tech}
        </span>
      ))}
    </div>
    <span className="inline-block px-3 py-1 bg-white/5 text-white/70 text-xs rounded-full border border-white/10">
      {project.tag}
    </span>
  </motion.div>
);

const Projects = () => {
  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-space-grotesk font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com"
            className="text-accent-lime hover:underline font-inter"
          >
            40+ more on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;