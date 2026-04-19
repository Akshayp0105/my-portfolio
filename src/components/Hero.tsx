import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/* ── Framer Motion Typewriter Config ─────────────────────────────────────── */
const subtitleText = "Full Stack Developer · Startup Founder · Builder";
const subtitleChars = subtitleText.split('');

const subtitleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

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
    <group position={[0, 0, 0]}>
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

/* ── Particle sphere with mouse repulsion ────────────────────────────────── */
function ParticleSphere({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef    = useRef<THREE.BufferGeometry>(null);
  const mouseVec  = useRef(new THREE.Vector2(0, 0));
  const { camera } = useThree();
  
  const originPositions = useRef<Float32Array>(new Float32Array());
  const posArr = useRef<Float32Array>(new Float32Array());

  useEffect(() => {
    const init = buildParticlePositions(count);
    originPositions.current = init.slice();
    posArr.current = init.slice();
    if (geoRef.current) {
      geoRef.current.setAttribute('position', new THREE.BufferAttribute(posArr.current, 3));
    }
  }, [count]);

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
    if (!pos || posArr.current.length === 0) return;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const ox = originPositions.current[ix];
      const oy = originPositions.current[ix + 1];
      const oz = originPositions.current[ix + 2];

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Mobile Blob Background (Performance) ── */}
      {isMobile && <div className="mobile-blob" />}

      {/* ── UI layer ── */}
      <div className="hero-text-block">
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Portfolio · 2025
        </motion.p>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.h1
              className="font-space-grotesk font-black text-white leading-none mb-6 hero-title-fix"
              style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              AKSHAY P
            </motion.h1>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 mb-12 h-9"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <motion.span
              className="font-inter text-xl md:text-2xl hero-subtitle-fix"
              variants={subtitleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {subtitleChars.map((char, i) => (
                <motion.span key={i} variants={charVariants}>
                  {char}
                </motion.span>
              ))}
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: '#c8ff00',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                  animationDelay: '2.5s' // Accounts for typing time + parent fade-in delay
                }}
              />
            </motion.span>
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

          <motion.div
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "13px",
              color: "rgba(160, 170, 200, 0.65)",
              letterSpacing: "0.05em",
              borderLeft: "2px solid rgba(200, 255, 0, 0.3)",
              paddingLeft: "12px",
              marginTop: "28px"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            // B.Tech CSE · TIST Kochi · 2023 – 2027
          </motion.div>
      </div>

      {/* ── 3D Canvas ── */}
      <div className="hero-canvas-block">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[5,  5, 5]}  intensity={1}   color="#c8ff00" />
          <directionalLight position={[-5,-3,-5]} intensity={0.5} color="#6C63FF" />
          {!isMobile && <AnimatedTorusKnot />}
          <group position={[0, 0, 0]}>
            <ParticleSphere count={isMobile ? 800 : 2800} />
          </group>
          <EffectComposer>
            <Bloom luminanceThreshold={0.3} intensity={1.2} mipmapBlur />
          </EffectComposer>
        </Canvas>
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