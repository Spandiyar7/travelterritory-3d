"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ImageRevealFrameProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Рамка с эффектом «шторки», открывающей изображение при скролле. */
export function ImageRevealFrame({
  children,
  className,
  delay = 0,
}: ImageRevealFrameProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("relative overflow-hidden", className)}>{children}</div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-20 bg-[linear-gradient(120deg,#e4f5ec,#f3fbf6)]"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease: [0.7, 0, 0.2, 1] }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
}
