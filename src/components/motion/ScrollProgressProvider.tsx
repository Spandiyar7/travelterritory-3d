"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/lib/scroll-store";

/**
 * Измеряет прогресс скролла страницы и положение указателя,
 * пишет их в scene-стор. Глобальная 3D-сцена читает стор каждый кадр.
 * Рендерится один раз на главной странице.
 */
export function ScrollProgressProvider() {
  useEffect(() => {
    const { setProgress, setPointer } = useSceneStore.getState();

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onPointer = (e: PointerEvent) => {
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
