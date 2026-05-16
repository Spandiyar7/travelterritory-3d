"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { random } from "maath";
import { useSceneFrozen } from "@/lib/useReducedMotion";

/** Лёгкие атмосферные частицы, медленно дрейфующие вокруг сцены. */
export function TravelParticles({ count = 300 }: { count?: number }) {
  const frozen = useSceneFrozen();
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    random.inSphere(arr, { radius: 7 });
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (frozen || !ref.current) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.07;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#79cbb3"
        transparent
        opacity={0.34}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
