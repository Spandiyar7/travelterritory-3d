"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useSceneStore } from "@/lib/scroll-store";
import { useSceneFrozen } from "@/lib/useReducedMotion";

/**
 * Дирижёр сцены. В обычном режиме сцена рендерится постоянно.
 * В режиме freeze/QA — кадр перерисовывается только при изменении скролла,
 * чтобы исключить лишние циклы рендера.
 */
export function ScrollStageController() {
  const frozen = useSceneFrozen();
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (!frozen) return;
    invalidate();
    return useSceneStore.subscribe(() => invalidate());
  }, [frozen, invalidate]);

  return null;
}
