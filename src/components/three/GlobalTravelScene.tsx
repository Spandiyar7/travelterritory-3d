"use client";

import { Canvas } from "@react-three/fiber";
import { useSceneFrozen } from "@/lib/useReducedMotion";
import { TravelSceneLights } from "./TravelSceneLights";
import { TravelCameraRig } from "./TravelCameraRig";
import { ScrollStageController } from "./ScrollStageController";
import { TravelScrollWorld } from "./TravelScrollWorld";

/**
 * Глобальная 3D-сцена путешествия — один оптимизированный Canvas,
 * управляемый прогрессом скролла. Загружается только на клиенте.
 */
export function GlobalTravelScene() {
  const frozen = useSceneFrozen();
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.45, 7.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={frozen ? "demand" : "always"}
      style={{ position: "absolute", inset: 0 }}
    >
      <TravelSceneLights />
      <TravelCameraRig />
      <ScrollStageController />
      <TravelScrollWorld isMobile={isMobile} />
    </Canvas>
  );
}
