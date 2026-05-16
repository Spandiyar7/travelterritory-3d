"use client";

import { useQaStore } from "@/lib/qa-store";

/** true => анимации движения отключены (QA-режим или prefers-reduced-motion). */
export function useReducedMotion(): boolean {
  return useQaStore((s) => s.qa || s.motionOff);
}

/** true => 3D-сцена остановлена на статичном кадре. */
export function useSceneFrozen(): boolean {
  return useQaStore((s) => s.qa || s.freezeScene);
}

/** true => активен режим визуального QA. */
export function useQaMode(): boolean {
  return useQaStore((s) => s.qa);
}

/** true => флаги окружения уже инициализированы на клиенте. */
export function useMotionReady(): boolean {
  return useQaStore((s) => s.ready);
}
