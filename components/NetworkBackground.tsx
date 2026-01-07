import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = ({ count = 120, connectionDistance = 3.5, isDark = true }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return p;
  }, [count]);

  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Store velocities
  const velocities = useMemo(() => {
    const v = [];
    for (let i = 0; i < count; i++) {
      v.push(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
    }
    return v;
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current || !linesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    // Update positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Boundary check - bounce back
      if (Math.abs(positions[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;

      // Mouse repulsion
      const mouseVec = new THREE.Vector3(state.pointer.x * 12, state.pointer.y * 12, 0); // Approx screen space to world space
      const dx = positions[i * 3] - mouseVec.x;
      const dy = positions[i * 3 + 1] - mouseVec.y;
      const distSq = dx * dx + dy * dy;
      const repulsionRadius = 4;

      if (distSq < repulsionRadius * repulsionRadius) {
          const dist = Math.sqrt(distSq);
          const force = (repulsionRadius - dist) / repulsionRadius; // 0 to 1 linear falloff
          const pushStrength = 0.1; // Adjust power
          
          if (dist > 0.1) {
             positions[i * 3] += (dx / dist) * force * pushStrength;
             positions[i * 3 + 1] += (dy / dist) * force * pushStrength;
          }
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connections
    const linePositions = [];
    const lineColors = [];
    
    for (let i = 0; i < count; i++) {
      const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      
      for (let j = i + 1; j < count; j++) {
        const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        const dist = p1.distanceTo(p2);

        if (dist < connectionDistance) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          
          // Alpha based on distance
          const alpha = (1 - dist / connectionDistance) * (isDark ? 0.6 : 0.4);
          // Color: Blueish
          const r = isDark ? 0.2 : 0.15;
          const g = isDark ? 0.4 : 0.35;
          const b = isDark ? 1.0 : 0.9;
          
          lineColors.push(r, g, b, alpha);
          lineColors.push(r, g, b, alpha);
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      'position', 
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesRef.current.geometry.setAttribute(
      'color', 
      new THREE.Float32BufferAttribute(lineColors, 4)
    );
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color={isDark ? "#3b82f6" : "#2563eb"}
          sizeAttenuation={true}
          transparent
          opacity={isDark ? 0.8 : 0.6}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial 
          vertexColors={true} 
          transparent={true} 
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} 
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};

const NetworkBackground: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDark();
    
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]} // Support high DPI
        gl={{ alpha: true, antialias: true }}
      >
        <ParticleNetwork count={150} connectionDistance={3.5} isDark={isDark} />
      </Canvas>
    </div>
  );
};

export default NetworkBackground;