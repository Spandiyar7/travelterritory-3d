"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  ALMATY,
  buildArc,
  GLOBE_RADIUS,
  latLngToVec3,
  SCENE_ROUTE_TARGETS,
} from "@/lib/three-helpers";
import { useSceneFrozen } from "@/lib/useReducedMotion";

const FORWARD = new THREE.Vector3(0, 0, 1);

/** Стилизованный самолёт, плавно летящий по главному маршруту. */
export function AirplaneModel() {
  const frozen = useSceneFrozen();
  const carrier = useRef<THREE.Group>(null);
  const progress = useRef(0.18);

  const curve = useMemo(
    () =>
      buildArc(
        latLngToVec3(ALMATY.lat, ALMATY.lng, GLOBE_RADIUS),
        latLngToVec3(
          SCENE_ROUTE_TARGETS[0].lat,
          SCENE_ROUTE_TARGETS[0].lng,
          GLOBE_RADIUS,
        ),
        1.34,
      ),
    [],
  );

  useFrame((_, delta) => {
    if (!carrier.current) return;
    const t = frozen
      ? 0.36
      : (progress.current = (progress.current + delta * 0.075) % 1);
    const point = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    carrier.current.position.copy(point);
    carrier.current.quaternion.setFromUnitVectors(FORWARD, tangent);
  });

  return (
    <group ref={carrier}>
      <group scale={0.78}>
        {/* Фюзеляж */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.34, 8, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.32}
            roughness={0.26}
          />
        </mesh>
        {/* Крылья */}
        <mesh position={[0, -0.012, 0.02]}>
          <boxGeometry args={[0.62, 0.014, 0.13]} />
          <meshStandardMaterial
            color="#ecfff8"
            metalness={0.28}
            roughness={0.38}
          />
        </mesh>
        {/* Киль */}
        <mesh position={[0, 0.06, -0.2]}>
          <boxGeometry args={[0.014, 0.12, 0.085]} />
          <meshStandardMaterial
            color="#ecfff8"
            metalness={0.28}
            roughness={0.38}
          />
        </mesh>
        {/* Хвостовой стабилизатор */}
        <mesh position={[0, 0, -0.19]}>
          <boxGeometry args={[0.27, 0.012, 0.06]} />
          <meshStandardMaterial
            color="#ecfff8"
            metalness={0.28}
            roughness={0.38}
          />
        </mesh>
        {/* Иллюминаторная полоса */}
        <mesh position={[0, 0.02, 0.05]}>
          <boxGeometry args={[0.022, 0.018, 0.22]} />
          <meshStandardMaterial
            color="#11865d"
            emissive="#11865d"
            emissiveIntensity={1.35}
            toneMapped={false}
          />
        </mesh>
        {/* Инверсионный след */}
        <mesh position={[0, 0, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.07, 0.7, 14, 1, true]} />
          <meshBasicMaterial
            color="#9be6d0"
            transparent
            opacity={0.24}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
