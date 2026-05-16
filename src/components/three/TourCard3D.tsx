"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type TourCard3DProps = {
  children: ReactNode;
  className?: string;
};

/**
 * CSS-3D оболочка карточки тура: наклон к курсору + блик, следующий за курсором.
 * Лёгкая по производительности — без WebGL. В reduced-motion — обычный лифт.
 */
export function TourCard3D({ children, className }: TourCard3DProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 160,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.16), transparent 62%)`;

  if (reduced) {
    return <div className={cn("lift", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group/card relative lift [transform-style:preserve-3d]",
        className,
      )}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{ background: glare }}
      />
    </motion.div>
  );
}
