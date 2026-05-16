"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useSceneFrozen } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

// Детерминированные данные модели (без Math.random — стабильный рендер).
const BAR_WIDTHS = [
  0.014, 0.007, 0.012, 0.018, 0.006, 0.011, 0.016, 0.008, 0.013, 0.007, 0.017,
  0.01, 0.014,
];
const PERFORATION = Array.from({ length: 8 }, (_, i) => -0.3 + i * 0.085);

/** Детальный 3D-посадочный талон: шапка, перфорация, штрихкод, маршрут A→B. */
export function BoardingPassModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: Vec3;
  rotation?: Vec3;
  scale?: number;
}) {
  const frozen = useSceneFrozen();
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (frozen || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.34) * 0.18;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.26) * 0.08;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.09;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* Корпус талона */}
      <RoundedBox args={[1.5, 0.74, 0.035]} radius={0.045} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.26}
        />
      </RoundedBox>

      {/* Шапка */}
      <mesh position={[0, 0.27, 0.021]}>
        <boxGeometry args={[1.5, 0.2, 0.008]} />
        <meshStandardMaterial
          color="#38a7d8"
          emissive="#38a7d8"
          emissiveIntensity={0.42}
          toneMapped={false}
        />
      </mesh>

      {/* Линия перфорации */}
      {PERFORATION.map((y, i) => (
        <mesh key={i} position={[0.38, y, 0.022]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color="#11865d" />
        </mesh>
      ))}

      {/* Маршрут A → B */}
      <mesh position={[-0.42, 0.02, 0.024]}>
        <sphereGeometry args={[0.032, 14, 14]} />
        <meshStandardMaterial
          color="#11865d"
          emissive="#11865d"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-0.07, 0.02, 0.024]}>
        <boxGeometry args={[0.62, 0.012, 0.006]} />
        <meshStandardMaterial color="#5e7da0" />
      </mesh>
      <mesh position={[0.04, 0.06, 0.026]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.035, 0.1, 12]} />
        <meshStandardMaterial color="#f3fbf6" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0.28, 0.02, 0.024]}>
        <sphereGeometry args={[0.032, 14, 14]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>

      {/* Строки данных */}
      <mesh position={[-0.18, -0.16, 0.022]}>
        <boxGeometry args={[0.7, 0.03, 0.006]} />
        <meshStandardMaterial color="#9fb6d4" />
      </mesh>
      <mesh position={[-0.28, -0.24, 0.022]}>
        <boxGeometry args={[0.5, 0.026, 0.006]} />
        <meshStandardMaterial color="#5e7da0" />
      </mesh>

      {/* Штрихкод на отрывной части */}
      {BAR_WIDTHS.map((w, i) => (
        <mesh key={i} position={[0.52 + i * 0.026, -0.04, 0.022]}>
          <boxGeometry args={[w, 0.34, 0.006]} />
          <meshStandardMaterial color="#cdd9e8" />
        </mesh>
      ))}
    </group>
  );
}
