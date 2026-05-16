"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneFrozen } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

/** Узлы маршрута-путешествия (этапы «как это работает»). */
const NODES: Vec3[] = [
  [-2.6, -1.1, 0.3],
  [-1.3, -0.35, -0.35],
  [0, 0.35, 0.35],
  [1.4, 0.85, -0.25],
  [2.7, 1.5, 0.4],
];

const FLOW_COUNT = 5;

/** 3D-маршрут путешествия: восходящая линия с узлами-этапами и потоком частиц. */
export function MapLineSystem() {
  const frozen = useSceneFrozen();
  const flow = useRef<THREE.Group>(null);
  const progress = useRef(0);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        NODES.map((n) => new THREE.Vector3(...n)),
        false,
        "catmullrom",
        0.4,
      ),
    [],
  );
  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 110, 0.012, 8, false),
    [curve],
  );
  const offsets = useMemo(
    () => Array.from({ length: FLOW_COUNT }, (_, i) => i / FLOW_COUNT),
    [],
  );

  useFrame((_, delta) => {
    if (!flow.current) return;
    if (!frozen) progress.current = (progress.current + delta * 0.08) % 1;
    flow.current.children.forEach((child, i) => {
      const t = (progress.current + offsets[i]) % 1;
      child.position.copy(curve.getPoint(t));
    });
  });

  return (
    <group>
      {/* Линия маршрута */}
      <mesh geometry={tube}>
        <meshBasicMaterial
          color="#11865d"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Узлы-этапы */}
      {NODES.map((node, i) => (
        <group key={i} position={node}>
          <mesh>
            <icosahedronGeometry args={[0.08, 1]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#f97316"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
          <mesh scale={2.4}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial
              color="#f97316"
              transparent
              opacity={0.12}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* Поток частиц по маршруту */}
      <group ref={flow}>
        {offsets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.026, 12, 12]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
