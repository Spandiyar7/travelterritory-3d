"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type SectionDepthLayerProps = {
  children: ReactNode;
  className?: string;
  /** Сила параллакса; отрицательное значение двигает в обратную сторону */
  depth?: number;
};

/** Слой контента с параллакс-смещением по скроллу — создаёт ощущение глубины. */
export function SectionDepthLayer({
  children,
  className,
  depth = 0.16,
}: SectionDepthLayerProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${depth * 64}px`, `${depth * -64}px`],
  );

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  );
}
