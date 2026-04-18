import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/* ── Typewriter hook ─────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 60, delay = 800) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return displayed;
}

/* ── Shader strings ──────────────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vNoise;
  void main() {
    vUv = uv;
    vec3 pos = position;
    vNoise = sin(pos.x * 3.0 + uTime) * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vNoise;
  void main() {
    vec3 lime   = vec3(0.784, 1.0,  0.0);
    vec3 purple = vec3(0.424, 0.388, 1.0);
    float t = sin(uTime * 0.7) * 0.5 + 0.5;
    vec3 col = mix(purple, lime, t * vNoise);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ── Animated TorusKnot ──────────────────────────────────────────────────── */
function AnimatedTorusKnot() {
  const meshRef  = useRef<THREE.Mesh>(null);
  const wireRef  = useRef<THREE.Mesh>(null);
  const matRef   = useRef<THREE.ShaderMaterial>(null);
  const geomRef  = useRef<THREE.TorusKnotGeometry | null>(null);

  if (!geomRef.current) {
    geomRef.current = new THREE.TorusKnotGeometry(1.2, 0.38, 200, 32, 2, 3);
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.3;
      wireRef.current.rotation.y = t * 0.2;
    }
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geomRef.current}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ uTime: { value: 0 } }}
        />
      </mesh>
      <mesh ref={wireRef} geometry={geomRef.current}>
        <meshBasicMaterial color="#c8ff00" wireframe opacity={0.25} transparent />
      </mesh>
    </group>
  );
}

/* ── Generate particle positions once ───────────────────────────────────── */
function buildParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution for even spread
    const y = 1 - (i / (count - 1)) * 2;
    const radius = 3.2 * Math.sqrt(1 - y * y);
    const theta = phi * i;
    arr[i * 3]     = Math.cos(theta) * radius + (Math.random() - 0.5) * 0.08;
    arr[i * 3 + 1] = y * 3.2            + (Math.random() - 0.5) * 0.08;
    arr[i * 3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 0.08;
  }
  return arr;
}

const PARTICLE_COUNT = 2800;
const INITIAL_POSITIONS = buildParticlePositions(PARTICLE_COUNT);
const ORIGIN_POSITIONS  = INITIAL_POSITIONS.slice(); // immutable copy

/* ── Particle sphere with mouse repulsion ────────────────────────────────── */
function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef    = useRef<THREE.BufferGeometry>(null);
  const mouseVec  = useRef(new THREE.Vector2(0, 0));
  const { camera } = useThree();
  const posArr = useRef(INITIAL_POSITIONS.slice()); // mutable working copy

  // Imperatively set buffer attribute to avoid R3F v9 JSX args requirement
  useEffect(() => {
    if (!geoRef.current) return;
    const attr = new THREE.BufferAttribute(posArr.current, 3);
    geoRef.current.setAttribute('position', attr);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseVec.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseVec.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    // Slow Y rotation
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.06;

    const ray = new THREE.Raycaster();
    ray.setFromCamera(mouseVec.current, camera);

    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    if (!pos) return;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const ox = ORIGIN_POSITIONS[ix];
      const oy = ORIGIN_POSITIONS[ix + 1];
      const oz = ORIGIN_POSITIONS[ix + 2];

      // World space position
      const worldPt = new THREE.Vector3(ox, oy, oz)
        .applyMatrix4(pointsRef.current.matrixWorld);

      const dist = ray.ray.distanceToPoint(worldPt);
      const repelStrength = Math.max(0, 1 - dist / 1.2) * 0.6;

      const dir = worldPt.clone().sub(ray.ray.origin).normalize();

      posArr.current[ix]     = ox + dir.x * repelStrength;
      posArr.current[ix + 1] = oy + dir.y * repelStrength;
      posArr.current[ix + 2] = oz + dir.z * repelStrength;
    }

    pos.array.set(posArr.current);
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        color="#6C63FF"
        size={0.016}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
const Hero = () => {
  const subtitle = useTypewriter('Builder · Founder · Engineer', 55, 900);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── 3D Canvas (absolute, full viewport) ── */}
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5,  5, 5]}  intensity={1}   color="#c8ff00" />
        <directionalLight position={[-5,-3,-5]} intensity={0.5} color="#6C63FF" />
        <AnimatedTorusKnot />
        <ParticleSphere />
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} intensity={1.2} mipmapBlur />
        </EffectComposer>
      </Canvas>

      {/* ── UI layer (z-index 10) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-16">
        <div className="max-w-3xl">
          <motion.p
            className="section-label mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Portfolio · 2025
          </motion.p>

          <motion.h1
            className="font-space-grotesk font-black text-white leading-none mb-6"
            style={{ fontSize: 'clamp(52px, 9vw, 110px)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            AKSHAY P
          </motion.h1>

          <motion.div
            className="flex items-center gap-3 mb-12 h-9"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <span
              className="font-inter text-xl md:text-2xl typewriter-cursor"
              style={{ color: 'var(--lime)' }}
            >
              {subtitle}
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <a
              href="#projects"
              className="px-8 py-4 border-2 border-accent-lime text-white font-inter font-medium
                         hover:bg-accent-lime/10 transition-all duration-300 rounded-sm text-sm
                         tracking-widest uppercase text-center"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 text-white/60 hover:text-white font-inter font-medium
                         transition-all duration-300 text-sm tracking-widest uppercase text-center"
            >
              Download Resume →
            </a>
          </motion.div>

          {/* Location badge */}
          <motion.div
            className="mt-16 flex items-center gap-2 text-white/30 text-sm font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <span>📍</span>
            <span>Kochi, Kerala</span>
            <span className="mx-2 text-white/10">·</span>
            <span>B.Tech CSE · Toc H Institute · 2027</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span className="text-white/25 text-xs tracking-widest font-inter uppercase">Scroll</span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, var(--lime), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;