"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneFrozen } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

const CLUSTERS: { pos: Vec3; scale: number }[] = [
  { pos: [-3.3, 1.7, -1], scale: 1.1 },
  { pos: [3.5, -1.3, -0.6], scale: 1.4 },
  { pos: [-2.6, -2.0, 1.2], scale: 0.9 },
  { pos: [2.9, 2.1, 0.5], scale: 1.0 },
  { pos: [0.3, -2.7, -2], scale: 1.25 },
];

const PUFFS: { offset: Vec3; size: number }[] = [
  { offset: [0, 0, 0], size: 1.05 },
  { offset: [0.52, 0.12, 0], size: 0.72 },
  { offset: [-0.5, 0.07, 0.05], size: 0.66 },
  { offset: [0.18, -0.2, 0.08], size: 0.56 },
];

function makeCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,0.92)");
    gradient.addColorStop(0.5, "rgba(214,236,255,0.4)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

function CloudCluster({
  position,
  scale,
  texture,
  phase,
}: {
  position: Vec3;
  scale: number;
  texture: THREE.Texture;
  phase: number;
}) {
  const frozen = useSceneFrozen();
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (frozen || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * 0.12 + phase) * 0.55;
    ref.current.position.y = position[1] + Math.sin(t * 0.18 + phase) * 0.18;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {PUFFS.map((puff, i) => (
        <sprite key={i} position={puff.offset} scale={puff.size}>
          <spriteMaterial
            map={texture}
            transparent
            opacity={0.42}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

/** Мягкие атмосферные облака — спрайты с процедурной текстурой. */
export function FloatingClouds() {
  const texture = useMemo(() => makeCloudTexture(), []);
  return (
    <>
      {CLUSTERS.map((cluster, i) => (
        <CloudCluster
          key={i}
          position={cluster.pos}
          scale={cluster.scale}
          texture={texture}
          phase={i * 1.7}
        />
      ))}
    </>
  );
}
