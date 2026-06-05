"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

/**
 * Stylized 3D volleyball: a warm-white sphere with three orthogonal seam rings,
 * lit by a soft key plus a brand-red rim so it catches red on one edge. Slow
 * auto-orbit, drag to spin. A real product object on a slow camera orbit, per
 * the brand's 3D rule. Frozen under reduced-motion.
 */
function Ball() {
  const seamRotations: [number, number, number][] = [
    [0, 0, 0],
    [Math.PI / 2, 0, 0],
    [0, Math.PI / 2, 0],
  ];

  return (
    <group rotation={[0.35, 0, 0.12]}>
      {/* Panels */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#f5f3ee" roughness={0.42} metalness={0.04} />
      </mesh>
      {/* Seams */}
      {seamRotations.map((rot, i) => (
        <mesh key={i} rotation={rot}>
          <torusGeometry args={[1.001, 0.018, 20, 120]} />
          <meshStandardMaterial color="#b9b3a8" roughness={0.6} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

export default function Volleyball() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-2, 1, 3]} intensity={0.5} />
      {/* Brand-red rim light — kept to the edge so the ball reads white */}
      <pointLight position={[-4.5, 0.2, 0.5]} intensity={13} color="#D7172A" distance={8} />

      <Ball />

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.45}
        scale={6}
        blur={2.4}
        far={3}
        color="#000000"
      />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduce}
        autoRotateSpeed={1.1}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 2 - 0.55}
        maxPolarAngle={Math.PI / 2 + 0.4}
      />
    </Canvas>
  );
}
