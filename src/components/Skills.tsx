import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/* ── Skills data ─────────────────────────────────────────────────────────── */
const GLOBE_SKILLS = [
  'React', 'Node.js', 'Python', 'MySQL', 'Django', 'Git', 'Figma',
  'Three.js', 'Express', 'JavaScript', 'HTML5', 'CSS3',
  'Leadership', 'Project Management',
  'TypeScript', 'Next.js', 'Firebase', 'Supabase', 'MongoDB', 'Kubernetes', 'Jira', 'Tableau', 'Docker'
];

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Figma']
  },
  {
    label: 'Backend & Data',
    skills: ['Node.js', 'Python', 'Express', 'Django', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'Tableau']
  },
  {
    label: 'DevOps & Tools',
    skills: ['Git', 'Jira', 'Kubernetes', 'Docker']
  },
  {
    label: 'Exploring',
    skills: ['DevOps', 'Android Development', 'IoT', 'Cloud Architecture'],
    isExploring: true
  }
];

/* ── Distribute tags on sphere surface ───────────────────────────────────── */
function fibonacciSphere(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

const positions = fibonacciSphere(GLOBE_SKILLS.length, 2.4);

/* ── Orbiting tag ─────────────────────────────────────────────────────────── */
function OrbTag({ position, label, idx }: { position: [number, number, number]; label: string; idx: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const tier = idx % 3;
  const radiusScale = tier === 0 ? 1 : tier === 1 ? 1.15 : 0.85;
  const speedScale = tier === 0 ? 1 : tier === 1 ? 1.2 : 0.8;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 0.25 * speedScale + idx * 0.3;
    const baseRadius = Math.sqrt(position[0] ** 2 + position[2] ** 2);
    const radius = baseRadius * radiusScale;
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.z = Math.sin(t) * radius;
    groupRef.current.position.y = position[1] * radiusScale;
  });

  const isLime = idx % 3 === 0;
  const isPurple = idx % 3 === 1;
  const tagColor = isLime ? '#c8ff00' : isPurple ? '#6C63FF' : '#ffffff';

  return (
    <group ref={groupRef} position={[position[0] * radiusScale, position[1] * radiusScale, position[2] * radiusScale]}>
      <Html center distanceFactor={6} zIndexRange={[0, 10]}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '11px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            color: tagColor,
            background: 'rgba(10,10,15,0.7)',
            border: `1px solid ${tagColor}40`,
            backdropFilter: 'blur(4px)',
            whiteSpace: 'nowrap',
            cursor: 'none',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

/* ── Globe scene ──────────────────────────────────────────────────────────── */
function GlobeScene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#c8ff00" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#6C63FF" />

      {/* Core sphere */}
      <Sphere ref={sphereRef} args={[2.4, 48, 48]}>
        <meshStandardMaterial
          color="#0d0d20"
          transparent
          opacity={0.35}
          wireframe
        />
      </Sphere>

      {/* Orbiting tags */}
      {GLOBE_SKILLS.map((skill, i) => (
        <OrbTag key={skill} position={positions[i]} label={skill} idx={i} />
      ))}
    </>
  );
}

/* ── Skill chip grid ──────────────────────────────────────────────────────── */
const chipColors: Record<string, string> = {
  React: '#61dafb',
  'Node.js': '#68a063',
  Python: '#3572A5',
  MySQL: '#4479A1',
  Django: '#092e20',
  Git: '#f05032',
  Figma: '#f24e1e',
  'Three.js': '#c8ff00',
  Express: '#ffffff',
  JavaScript: '#f7df1e',
  HTML5: '#e34f26',
  CSS3: '#2965f1',
  Leadership: '#6C63FF',
  'Project Management': '#6C63FF',
  TypeScript: '#3178c6',
  'Next.js': '#ffffff',
  Firebase: '#ffca28',
  Supabase: '#3ecf8e',
  MongoDB: '#47a248',
  Kubernetes: '#326ce5',
  Jira: '#0052cc',
  Tableau: '#e97627',
  Docker: '#2496ed',
  DevOps: '#6C63FF',
  'Android Development': '#3ddc84',
  IoT: '#c8ff00',
  'Cloud Architecture': '#6C63FF',
};

const Skills = () => (
  <section
    id="skills"
    className="py-28 px-6 md:px-12 lg:px-20"
    style={{ background: '#0a0a0f' }}
  >
    <div className="max-w-7xl mx-auto">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        04 · Skills
      </motion.p>

      <motion.h2
        className="text-4xl md:text-5xl font-space-grotesk font-bold text-white mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Tech Stack & Tools
      </motion.h2>

      {/* 3D Globe */}
      <motion.div
        className="globe-canvas mx-auto mb-16 max-w-2xl"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', height: '100%' }}
        >
          <GlobeScene />
        </Canvas>
      </motion.div>

      {/* Flat chip grid categorized */}
      <motion.div
        className="flex flex-col items-center gap-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {SKILL_CATEGORIES.map((cat, catIdx) => (
          <div key={cat.label} className="flex flex-col items-center w-full">
            <h3 className="text-[11px] text-white/40 uppercase tracking-widest mb-4">
              {cat.label}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-chip px-4 py-2 rounded-full text-sm font-inter"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: cat.isExploring ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.9)',
                    border: cat.isExploring ? '1px dashed rgba(255,255,255,0.3)' : '1px solid transparent',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (catIdx * 0.1) + (i * 0.04) }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.08,
                    background: `${chipColors[skill] ?? '#6C63FF'}18`,
                    borderColor: `${chipColors[skill] ?? '#6C63FF'}50`,
                    color: chipColors[skill] ?? 'var(--lime)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;