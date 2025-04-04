"use client"

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import BSALogoPartial from './bsa-logo-small'; // Logo without text

// --- FloatingShape component ---
// A simple tetrahedron to evoke the logo's geometric style.
const FloatingShape: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <tetrahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial color="white" wireframe />
    </mesh>
  );
};

// --- FloatingShapes component ---
// Generates a collection of floating shapes at random positions.
const FloatingShapes: React.FC = () => {
  const shapes = Array.from({ length: 10 }, (_, i) => {
    const pos: [number, number, number] = [
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ];
    return <FloatingShape key={i} position={pos} />;
  });
  return <>{shapes}</>;
};

// --- BlockchainChains component ---
// Renders a "forest of chains" using glowing line segments.
const BlockchainChains: React.FC = () => {
  const chains = [
    { start: [-3, 0, -1] as [number, number, number], end: [3, 0, 1] as [number, number, number] },
    { start: [0, -2, 0] as [number, number, number], end: [0, 2, 0] as [number, number, number] },
    { start: [-2, -2, -1] as [number, number, number], end: [2, 2, 1] as [number, number, number] },
    { start: [-3, 2, -1] as [number, number, number], end: [3, -2, 1] as [number, number, number] },
  ];

  return (
    <>
      {chains.map((chain, i) => (
        <Line key={i} points={[chain.start, chain.end]} color="white" lineWidth={2} />
      ))}
    </>
  );
};

// --- HeroScene component ---
// Sets up the Three.js scene with ambient lighting and subtle parallax.
const HeroScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onPointerMove={(e) => {
        if (groupRef.current) {
          // Subtle rotation based on mouse movement for a dynamic parallax effect.
          groupRef.current.rotation.x = ((e.clientY / window.innerHeight) - 0.5) * 0.2;
          groupRef.current.rotation.y = ((e.clientX / window.innerWidth) - 0.5) * 0.2;
        }
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <group ref={groupRef}>
        <FloatingShapes />
        <BlockchainChains />
      </group>
    </Canvas>
  );
};

// --- BSAHero component ---
// Combines the 3D scene with a logo watermark overlay and a text overlay.
const BSAHero: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-[#1f273a] overflow-hidden">
      {/* 3D Scene */}
      <HeroScene />

      {/* Logo watermark overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <BSALogoPartial classname="w-full h-full" />
      </div>

      {/* Text overlay reserved on the right */}
      <div className="absolute top-0 right-0 p-10 w-1/3 h-full flex flex-col justify-center">
        <h1 className="text-white text-5xl font-bold">Blockchain Student Association</h1>
        <p className="text-white text-2xl mt-4">EPFL</p>
      </div>
    </section>
  );
};

export default BSAHero;