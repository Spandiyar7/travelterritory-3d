"use client";

import { useEffect, type ReactNode } from "react";
import { useQaStore } from "@/lib/qa-store";

/**
 * Считывает QA-флаги из URL (?qa=1, ?motion=off, ?scene=freeze)
 * и системную настройку prefers-reduced-motion, выставляет их в стор.
 * В этих режимах сцена замирает в хорошем кадре, анимации останавливаются.
 */
export function FreezeMotionProvider({ children }: { children: ReactNode }) {
  const apply = useQaStore((s) => s.apply);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qa = params.get("qa") === "1";
    const motionParam = params.get("motion") === "off";
    const sceneParam = params.get("scene") === "freeze";
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    apply({
      qa,
      motionOff: motionParam || prefersReduced,
      freezeScene: sceneParam,
    });

    const root = document.documentElement;
    if (qa) root.dataset.qa = "1";
    if (qa || motionParam || prefersReduced) root.dataset.motion = "off";
  }, [apply]);

  return <>{children}</>;
}
