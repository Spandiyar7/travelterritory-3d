"use client";

import { useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useQaStore } from "@/lib/qa-store";

/**
 * Плавный скролл Lenis, синхронизированный с GSAP ScrollTrigger.
 * Отключается в QA-режиме и при prefers-reduced-motion (нативный скролл).
 * Возвращает ref на экземпляр Lenis (без ре-рендеров).
 */
export function useLenis(): RefObject<Lenis | null> {
  const reduced = useReducedMotion();
  const ready = useQaStore((s) => s.ready);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!ready || reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    instance.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = instance;

    return () => {
      gsap.ticker.remove(onRaf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reduced, ready]);

  return lenisRef;
}
