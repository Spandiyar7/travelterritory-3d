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

const PARTICLES_PER_ROUTE = 5;

function Route({
  curve,
  speed,
}: {
  curve: THREE.QuadraticBezierCurve3;
  speed: number;
}) {
  const frozen = useSceneFrozen();
  const dots = useRef<THREE.Group>(null);
  const progress = useRef(0);

  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, 90, 0.0072, 8, false),
    [curve],
  );
  const offsets = useMemo(
    () =>
      Array.from({ length: PARTICLES_PER_ROUTE }, (_, i) => i / PARTICLES_PER_ROUTE),
    [],
  );

  useFrame((_, delta) => {
    if (!dots.current) return;
    if (!frozen) progress.current = (progress.current + delta * speed) % 1;
    dots.current.children.forEach((child, i) => {
      const t = (progress.current + offsets[i]) % 1;
      child.position.copy(curve.getPoint(t));
    });
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial
          color="#11865d"
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <group ref={dots}>
        {offsets.map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshBasicMaterial color="#f97316" toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Система дугообразных авиамаршрутов из Алматы со световыми частицами потока. */
export function FlightRouteSystem() {
  const curves = useMemo(
    () =>
      SCENE_ROUTE_TARGETS.map((target) =>
        buildArc(
          latLngToVec3(ALMATY.lat, ALMATY.lng, GLOBE_RADIUS),
          latLngToVec3(target.lat, target.lng, GLOBE_RADIUS),
          1.34,
        ),
      ),
    [],
  );

  return (
    <>
      {curves.map((curve, i) => (
        <Route key={i} curve={curve} speed={0.08 + i * 0.016} />
      ))}
    </>
  );
}
