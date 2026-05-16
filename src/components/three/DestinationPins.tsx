"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Destination } from "@/types/destination";
import { destinations } from "@/data/destinations";
import { GLOBE_RADIUS, latLngToVec3 } from "@/lib/three-helpers";

const PIN_SLUGS = ["turkey", "uae", "thailand", "egypt", "vietnam", "maldives"];

function Pin({ dest }: { dest: Destination }) {
  const group = useRef<THREE.Group>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scratch = useMemo(
    () => ({ world: new THREE.Vector3(), toCam: new THREE.Vector3() }),
    [],
  );
  const position = useMemo(
    () => latLngToVec3(dest.coords.lat, dest.coords.lng, GLOBE_RADIUS + 0.045),
    [dest],
  );

  // Подпись плавно гаснет, когда пин уходит на обратную сторону глобуса.
  useFrame(({ camera }) => {
    if (!group.current || !labelRef.current) return;
    group.current.getWorldPosition(scratch.world);
    scratch.toCam.copy(camera.position).sub(scratch.world).normalize();
    const facing = scratch.world.normalize().dot(scratch.toCam);
    labelRef.current.style.opacity = THREE.MathUtils.clamp(
      (facing - 0.06) * 2.6,
      0,
      1,
    ).toFixed(2);
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <icosahedronGeometry args={[0.04, 1]} />
        <meshStandardMaterial
          color={dest.accent}
          emissive={dest.accent}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={2.6}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial
          color={dest.accent}
          transparent
          opacity={0.13}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <Html
        center
        distanceFactor={9}
        zIndexRange={[24, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={labelRef}
          className="flex translate-y-[-2.4rem] items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-deep-navy/90 px-3 py-1 text-[11px] font-semibold text-cream"
        >
          <span aria-hidden>{dest.flag}</span>
          {dest.name}
        </div>
      </Html>
    </group>
  );
}

/** Светящиеся пины направлений на поверхности глобуса. */
export function DestinationPins() {
  const pins = useMemo(
    () => destinations.filter((d) => PIN_SLUGS.includes(d.slug)),
    [],
  );
  return (
    <>
      {pins.map((dest) => (
        <Pin key={dest.id} dest={dest} />
      ))}
    </>
  );
}
