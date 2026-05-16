"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { bandWeight } from "@/lib/three-helpers";
import { useSceneStore } from "@/lib/scroll-store";
import { TravelGlobe } from "./TravelGlobe";
import { FlightRouteSystem } from "./FlightRouteSystem";
import { AirplaneModel } from "./AirplaneModel";
import { DestinationPins } from "./DestinationPins";
import { FloatingClouds } from "./FloatingClouds";
import { TravelParticles } from "./TravelParticles";
import { PassportCards } from "./PassportCards";
import { BoardingPassModel } from "./BoardingPassModel";
import { HotelCard3D } from "./HotelCard3D";
import { HotTourPriceTags } from "./HotTourPriceTags";
import { MapLineSystem } from "./MapLineSystem";

type Vec3 = [number, number, number];

/**
 * Группа, появляющаяся только на своих скролл-стадиях.
 * Плавно масштабируется и сдвигается в кадр / из кадра.
 */
function StageGroup({
  band,
  drift = [0, 0, 0],
  children,
}: {
  band: [number, number];
  drift?: Vec3;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const stage = useSceneStore.getState().stage;
    const w = bandWeight(stage, band[0], band[1]);
    const next = THREE.MathUtils.lerp(
      ref.current.scale.x,
      0.4 + w * 0.6,
      0.1,
    );
    ref.current.scale.setScalar(next);
    ref.current.visible = w > 0.008 || next > 0.42;
    const off = 1 - w;
    ref.current.position.set(drift[0] * off, drift[1] * off, drift[2] * off);
  });

  return <group ref={ref}>{children}</group>;
}

/**
 * Единый 3D-мир путешествия. Глобус с маршрутами, самолётом и пинами —
 * постоянная ось; спутники (карточки, ценники, маршрут-этапы) появляются
 * на своих стадиях скролла.
 */
export function TravelScrollWorld({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <group>
      <TravelGlobe>
        <FlightRouteSystem />
        <AirplaneModel />
        <DestinationPins />
      </TravelGlobe>

      <FloatingClouds />
      <TravelParticles count={isMobile ? 120 : 280} />

      {/* Стадии 1–2: герой / подбор тура */}
      <StageGroup band={[0, 1.2]} drift={[0, 2.6, -1]}>
        <PassportCards />
      </StageGroup>
      <StageGroup band={[0, 2]} drift={[-3.4, 1, 0]}>
        <BoardingPassModel
          position={[-2.7, 0.4, 0.7]}
          rotation={[0.12, 0.55, -0.13]}
          scale={0.78}
        />
      </StageGroup>

      {/* Стадии 3–4: горящие туры / страны */}
      <StageGroup band={[2, 3.5]} drift={[0, -2.8, 0]}>
        <HotTourPriceTags />
      </StageGroup>
      {!isMobile && (
        <StageGroup band={[2.4, 4.4]} drift={[3.6, 0, 0]}>
          <HotelCard3D />
        </StageGroup>
      )}

      {/* Стадии 6–7: как это работает */}
      <StageGroup band={[4.6, 6.2]} drift={[0, 3.2, 0]}>
        <MapLineSystem />
      </StageGroup>

      {/* Стадии 7–8: отзывы / контакты */}
      <StageGroup band={[5.7, 7]} drift={[0, -2.8, 0.6]}>
        <PassportCards />
      </StageGroup>
    </group>
  );
}
