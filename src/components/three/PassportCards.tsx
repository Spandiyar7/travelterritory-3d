"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useSceneFrozen } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

type CardData = {
  pos: Vec3;
  rot: Vec3;
  color: string;
  phase: number;
};

const CARDS: CardData[] = [
  { pos: [-3.05, 0.5, 0.9], rot: [0.12, 0.52, -0.14], color: "#11865d", phase: 0 },
  { pos: [3.15, 1.25, -0.4], rot: [-0.12, -0.5, 0.16], color: "#f97316", phase: 1.7 },
  { pos: [2.7, -1.75, 1.0], rot: [0.18, -0.32, 0.1], color: "#38a7d8", phase: 3.1 },
];

function PassportCard({ data }: { data: CardData }) {
  const frozen = useSceneFrozen();
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (frozen || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = data.pos[1] + Math.sin(t * 0.5 + data.phase) * 0.15;
    ref.current.rotation.z = data.rot[2] + Math.sin(t * 0.4 + data.phase) * 0.09;
    ref.current.rotation.y = data.rot[1] + Math.sin(t * 0.32 + data.phase) * 0.13;
  });

  return (
    <group ref={ref} position={data.pos} rotation={data.rot}>
      {/* Корпус карточки */}
      <RoundedBox args={[0.94, 0.62, 0.04]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.25}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.22}
          transparent
          opacity={0.94}
        />
      </RoundedBox>
      {/* Цветная полоса-«заголовок» */}
      <mesh position={[0, 0.18, 0.026]}>
        <boxGeometry args={[0.94, 0.13, 0.012]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.75}
          toneMapped={false}
        />
      </mesh>
      {/* Чип */}
      <mesh position={[-0.3, -0.04, 0.03]}>
        <boxGeometry args={[0.16, 0.12, 0.012]} />
        <meshStandardMaterial color="#e2a238" metalness={0.65} roughness={0.3} />
      </mesh>
      {/* Строки-«данные» */}
      <mesh position={[0.1, 0.0, 0.029]}>
        <boxGeometry args={[0.42, 0.032, 0.008]} />
        <meshStandardMaterial color="#9fb6d4" />
      </mesh>
      <mesh position={[0.02, -0.13, 0.029]}>
        <boxGeometry args={[0.58, 0.028, 0.008]} />
        <meshStandardMaterial color="#6f87a6" />
      </mesh>
    </group>
  );
}

/** Парящие карточки паспорта / посадочного талона вокруг сцены. */
export function PassportCards() {
  return (
    <>
      {CARDS.map((card, i) => (
        <PassportCard key={i} data={card} />
      ))}
    </>
  );
}
