import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function AtomShape() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (hovered ? 2 : 0.5);
      groupRef.current.rotation.z += delta * (hovered ? 1 : 0.2);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 1.2;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 1.5;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 1.8;
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#c8ff00" toneMapped={false} />
        </mesh>
        
        {/* Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[0.7, 0.03, 16, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
        
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.7, 0.03, 16, 64]} />
          <meshBasicMaterial color="#c8ff00" transparent opacity={0.8} />
        </mesh>
        
        <mesh ref={ring3Ref} rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.7, 0.03, 16, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Logo3D() {
  return (
    <div style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <AtomShape />
      </Canvas>
    </div>
  );
}
