import { motion } from 'framer-motion';

const skills = [
  'React', 'Node.js', 'Python', 'MySQL', 'Django', 'Git', 'Figma',
  'JavaScript', 'HTML5', 'CSS3', 'Leadership', 'Project Management'
];

const SkillChip = ({ skill, index }: { skill: string; index: number }) => (
  <motion.span
    className="px-4 py-2 bg-white/8 text-white/60 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
  >
    {skill}
  </motion.span>
);

const Skills = () => {
  return (
    <section className="py-20 px-8 bg-bg-dark">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-space-grotesk font-bold text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>
        <motion.div
          className="w-80 h-80 mx-auto mb-12 border-2 border-dashed border-accent-purple/20 rounded-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-purple/60 text-lg">3D Skill Globe</span>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <SkillChip key={skill} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;