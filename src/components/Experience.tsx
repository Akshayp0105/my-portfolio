import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Tech Lead',
    company: 'TinkerHub',
    duration: '2023 - Present',
    description: 'Leading technical initiatives and mentoring developers in the community.',
    special: false
  },
  {
    role: 'Founder',
    company: 'CodeCatalyst',
    duration: '2023 - Present',
    description: 'Building a platform to connect developers with opportunities.',
    special: false
  },
  {
    role: 'Intern',
    company: 'MedTourEasy',
    duration: '2022 - 2023',
    description: 'Developed healthcare solutions and improved user experience.',
    special: false
  },
  {
    role: 'Co-Founder/CTO',
    company: 'Korvet Innovations',
    duration: '2021 - Present',
    description: 'Leading technology development for government-recognized startup.',
    special: true
  }
];

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => (
  <motion.div
    className={`glass p-6 rounded-lg min-w-[280px] relative ${
      experience.special ? 'border-2 border-yellow-400' : ''
    }`}
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
  >
    {experience.special && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white/5 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-400/30">
        🏛 Govt. Recognized
      </div>
    )}
    <h3 className="text-xl font-space-grotesk font-semibold text-white mb-1">
      {experience.role}
    </h3>
    <p className="text-white/60 font-inter mb-2">
      {experience.company}
    </p>
    <p className="text-white/50 text-sm font-inter mb-4">
      {experience.duration}
    </p>
    <p className="text-white/70 text-sm font-inter max-w-xs">
      {experience.description}
    </p>
  </motion.div>
);

const Experience = () => {
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
          Experience
        </motion.h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-lime opacity-30" />
          <div className="flex overflow-x-auto pb-8 space-x-8 snap-x snap-mandatory scrollbar-hide">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.company} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;