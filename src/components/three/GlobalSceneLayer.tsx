"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";

// 3D-сцена грузится только на клиенте, отдельным чанком.
const GlobalTravelScene = dynamic(
  () => import("./GlobalTravelScene").then((m) => m.GlobalTravelScene),
  { ssr: false, loading: () => <SceneFallback /> },
);

type BoundaryState = { failed: boolean };

/** При сбое WebGL показывает премиальную не-3D заглушку. */
class SceneErrorBoundary extends Component<
  { children: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}

/**
 * Фиксированный слой глобальной 3D-сцены под всей главной страницей.
 * Контент сайта скроллится поверх него.
 */
export function GlobalSceneLayer() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-deep-navy bg-aurora" />
      <SceneErrorBoundary>
        <GlobalTravelScene />
      </SceneErrorBoundary>
    </div>
  );
}
