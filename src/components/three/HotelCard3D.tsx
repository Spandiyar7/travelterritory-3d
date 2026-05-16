"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useSceneFrozen } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

type HotelCardData = {
  pos: Vec3;
  rot: Vec3;
  accent: string;
  stars: number;
  phase: number;
};

const HOTELS: HotelCardData[] = [
  { pos: [-2.7, 0.9, 0.5], rot: [0.1, 0.5, -0.1], accent: "#11865d", stars: 5, phase: 0 },
  { pos: [2.8, -0.6, -0.3], rot: [-0.12, -0.5, 0.12], accent: "#f97316", stars: 5, phase: 1.8 },
  { pos: [2.4, 1.5, 0.7], rot: [0.16, -0.3, 0.08], accent: "#38a7d8", stars: 4, phase: 3.2 },
];

function HotelCard({ data }: { data: HotelCardData }) {
  const frozen = useSceneFrozen();
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (frozen || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = data.pos[1] + Math.sin(t * 0.46 + data.phase) * 0.14;
    ref.current.rotation.y = data.rot[1] + Math.sin(t * 0.32 + data.phase) * 0.14;
    ref.current.rotation.z = data.rot[2] + Math.sin(t * 0.4 + data.phase) * 0.06;
  });

  return (
    <group ref={ref} position={data.pos} rotation={data.rot}>
      {/* Корпус карточки */}
      <RoundedBox args={[0.96, 1.16, 0.04]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.24}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.24}
        />
      </RoundedBox>
      {/* «Фото» отеля */}
      <mesh position={[0, 0.24, 0.026]}>
        <boxGeometry args={[0.82, 0.5, 0.01]} />
        <meshStandardMaterial
          color={data.accent}
          emissive={data.accent}
          emissiveIntensity={0.55}
          toneMapped={false}
        />
      </mesh>
      {/* Звёзды */}
      {Array.from({ length: data.stars }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.32 + i * 0.16, -0.12, 0.028]}
          rotation={[0, 0, Math.PI / 5]}
        >
          <boxGeometry args={[0.07, 0.07, 0.008]} />
          <meshStandardMaterial
            color="#e2a238"
            emissive="#e2a238"
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* Строки */}
      <mesh position={[-0.12, -0.3, 0.027]}>
        <boxGeometry args={[0.6, 0.04, 0.006]} />
        <meshStandardMaterial color="#9fb6d4" />
      </mesh>
      {/* Ценовая плашка */}
      <mesh position={[0, -0.46, 0.028]}>
        <boxGeometry args={[0.82, 0.16, 0.012]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** Парящие 3D-карточки отелей вокруг сцены. */
export function HotelCard3D() {
  return (
    <>
      {HOTELS.map((hotel, i) => (
        <HotelCard key={i} data={hotel} />
      ))}
    </>
  );
}
