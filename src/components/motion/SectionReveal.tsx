"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Вертикальное смещение появления */
  y?: number;
};

/**
 * Появление блока при попадании во вьюпорт.
 * В QA / reduced-motion рендерится сразу в финальном состоянии.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 30,
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
