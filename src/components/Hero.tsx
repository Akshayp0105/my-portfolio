import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-between px-8 pt-20">
      <div className="flex-1 max-w-2xl">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-space-grotesk font-black text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AKSHAY P
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-accent-lime font-inter mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Builder · Founder · Engineer
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="px-8 py-4 border-2 border-accent-lime text-white hover:bg-accent-lime/10 transition-all duration-300 rounded">
            View My Work
          </button>
          <button className="px-8 py-4 text-white/70 hover:text-white transition-all duration-300 rounded">
            Download Resume
          </button>
        </motion.div>
      </div>
      <motion.div
        className="flex-1 max-w-lg h-96 border-2 border-dashed border-accent-lime/20 flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <span className="text-accent-lime/60 text-lg">3D Zone</span>
      </motion.div>
    </section>
  );
};

export default Hero;