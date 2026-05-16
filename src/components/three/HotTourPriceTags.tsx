"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useSceneFrozen } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

type TagData = {
  pos: Vec3;
  rot: Vec3;
  accent: string;
  title: string;
  value: string;
  phase: number;
};

const TAGS: TagData[] = [
  { pos: [-2.6, 1.2, 0.6], rot: [0.1, 0.4, 0.18], accent: "#f97316", title: "Горящий тур", value: "от 312 000 ₸", phase: 0 },
  { pos: [2.7, 0.7, 0.3], rot: [0.05, -0.4, -0.16], accent: "#10b981", title: "Выгодно", value: "−25%", phase: 1.4 },
  { pos: [-2.3, -1.1, 0.2], rot: [-0.1, 0.3, 0.2], accent: "#11865d", title: "Хит", value: "Пхукет 9 ночей", phase: 2.6 },
  { pos: [2.3, -1.0, 0.7], rot: [0.12, -0.35, -0.2], accent: "#38a7d8", title: "Цена от", value: "246 000 ₸", phase: 3.7 },
];

function PriceTag({ data }: { data: TagData }) {
  const frozen = useSceneFrozen();
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (frozen || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = data.pos[1] + Math.sin(t * 0.5 + data.phase) * 0.12;
    ref.current.rotation.z = data.rot[2] + Math.sin(t * 0.4 + data.phase) * 0.1;
  });

  return (
    <group ref={ref} position={data.pos} rotation={data.rot}>
      {/* Бирка-багажный тег */}
      <RoundedBox args={[0.5, 0.32, 0.03]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
        />
      </RoundedBox>
      {/* Отверстие-люверс */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.035, 0.014, 10, 24]} />
        <meshStandardMaterial color={data.accent} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Цветная кромка */}
      <mesh position={[-0.21, 0, 0.016]}>
        <boxGeometry args={[0.05, 0.32, 0.006]} />
        <meshStandardMaterial
          color={data.accent}
          emissive={data.accent}
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div className="w-max rounded-lg border border-white/15 bg-deep-navy/85 px-2.5 py-1 text-center">
          <div
            className="text-[9px] font-bold uppercase tracking-wide"
            style={{ color: data.accent }}
          >
            {data.title}
          </div>
          <div className="text-[11px] font-extrabold text-cream">
            {data.value}
          </div>
        </div>
      </Html>
    </group>
  );
}

/** Парящие 3D-ценники горящих туров с подписями. */
export function HotTourPriceTags() {
  return (
    <>
      {TAGS.map((tag, i) => (
        <PriceTag key={i} data={tag} />
      ))}
    </>
  );
}
