"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Destination } from "@/types/destination";
import {
  ALMATY,
  buildArc,
  GLOBE_RADIUS,
  latLngToVec3,
} from "@/lib/three-helpers";
import { useSceneFrozen } from "@/lib/useReducedMotion";
import { TravelSceneLights } from "./TravelSceneLights";
import { TravelGlobe } from "./TravelGlobe";
import { TravelParticles } from "./TravelParticles";

/** Маршрут к выбранному направлению + светящийся пин с подписью. */
function FocusRoute({ destination }: { destination: Destination }) {
  const frozen = useSceneFrozen();
  const dot = useRef<THREE.Mesh>(null);
  const progress = useRef(0.1);

  const { curve, tube, pinPos } = useMemo(() => {
    const target = latLngToVec3(
      destination.coords.lat,
      destination.coords.lng,
      GLOBE_RADIUS,
    );
    const arc = buildArc(
      latLngToVec3(ALMATY.lat, ALMATY.lng, GLOBE_RADIUS),
      target,
      1.4,
    );
    return {
      curve: arc,
      tube: new THREE.TubeGeometry(arc, 84, 0.009, 8, false),
      pinPos: latLngToVec3(
        destination.coords.lat,
        destination.coords.lng,
        GLOBE_RADIUS + 0.05,
      ),
    };
  }, [destination]);

  useFrame((_, delta) => {
    if (!dot.current) return;
    if (frozen) {
      dot.current.position.copy(curve.getPoint(0.6));
      return;
    }
    progress.current = (progress.current + delta * 0.08) % 1;
    dot.current.position.copy(curve.getPoint(progress.current));
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial
          color={destination.accent}
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={dot}>
        <sphereGeometry args={[0.03, 14, 14]} />
        <meshBasicMaterial color="#fff3e0" toneMapped={false} />
      </mesh>
      <group position={pinPos}>
        <mesh>
          <icosahedronGeometry args={[0.07, 1]} />
          <meshStandardMaterial
            color={destination.accent}
            emissive={destination.accent}
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
        <mesh scale={2.6}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial
            color={destination.accent}
            transparent
            opacity={0.14}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="flex translate-y-[-2.6rem] items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-deep-navy/90 px-3 py-1 text-xs font-semibold text-cream">
            <span aria-hidden>{destination.flag}</span>
            {destination.name}
          </div>
        </Html>
      </group>
    </group>
  );
}

/** Компактная 3D-сцена для страницы конкретного направления. */
export function DestinationScene({
  destination,
}: {
  destination: Destination;
}) {
  const frozen = useSceneFrozen();
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={frozen ? "demand" : "always"}
      style={{ position: "absolute", inset: 0 }}
    >
      <TravelSceneLights />
      <TravelGlobe>
        <FocusRoute destination={destination} />
      </TravelGlobe>
      <TravelParticles count={140} />
    </Canvas>
  );
}
