"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "@/components/three/SceneFallback";
import { destinations } from "@/data/destinations";

const DestinationScene = dynamic(
  () =>
    import("@/components/three/DestinationScene").then(
      (m) => m.DestinationScene,
    ),
  { ssr: false, loading: () => <SceneFallback /> },
);

/** Контейнер 3D-сцены для страницы визуального QA. */
export function QaScene() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl glass-card">
      <DestinationScene destination={destinations[0]} />
    </div>
  );
}
