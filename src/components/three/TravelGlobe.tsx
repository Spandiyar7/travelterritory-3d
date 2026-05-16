"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { continentDots, GLOBE_RADIUS } from "@/lib/three-helpers";
import { useSceneFrozen } from "@/lib/useReducedMotion";
import { GlobeAtmosphere } from "./GlobeAtmosphere";

/**
 * Премиальный дот-глобус: ядро + двухслойная точечная карта (суша/океан),
 * два орбитальных кольца и атмосферный ореол. Дочерние объекты (маршруты,
 * самолёт, пины) вращаются вместе с миром.
 */
export function TravelGlobe({ children }: { children?: ReactNode }) {
  const frozen = useSceneFrozen();
  const world = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  const { land, ocean } = useMemo(
    () => continentDots(2600, GLOBE_RADIUS + 0.012),
    [],
  );

  useFrame((_, delta) => {
    if (frozen) return;
    if (world.current) world.current.rotation.y += delta * 0.04;
    if (ring1.current) ring1.current.rotation.z -= delta * 0.05;
    if (ring2.current) ring2.current.rotation.z += delta * 0.035;
  });

  return (
    <group>
      <GlobeAtmosphere radius={GLOBE_RADIUS} />

      <group ref={world} rotation={[0.34, 0.6, 0.05]}>
        {/* Ядро планеты */}
        <mesh>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
          <meshStandardMaterial
            color="#d7f3ef"
            roughness={0.54}
            metalness={0.08}
            emissive="#c5efe7"
            emissiveIntensity={0.34}
          />
        </mesh>

        {/* Дотты океана — тусклые */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[ocean, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.013}
            color="#57b7c9"
            transparent
            opacity={0.62}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Дотты суши — яркие, образуют абстрактные континенты */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[land, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.027}
            color="#11865d"
            transparent
            opacity={0.92}
            sizeAttenuation
            depthWrite={false}
            toneMapped={false}
          />
        </points>

        {children}
      </group>

      {/* Орбитальные кольца-маршруты */}
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.32, 0.005, 10, 140]} />
        <meshBasicMaterial
          color="#11865d"
          transparent
          opacity={0.46}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.9, 0.3, 0]}>
        <torusGeometry args={[GLOBE_RADIUS * 1.52, 0.0035, 10, 150]} />
        <meshBasicMaterial
          color="#38a7d8"
          transparent
          opacity={0.32}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
