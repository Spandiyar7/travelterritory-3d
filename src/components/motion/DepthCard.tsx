"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type DepthCardProps = {
  children: ReactNode;
  className?: string;
  /** Сила наклона в градусах */
  intensity?: number;
};

/** Карточка с 3D-наклоном к курсору. В reduced-motion — обычный hover-лифт. */
export function DepthCard({
  children,
  className,
  intensity = 7,
}: DepthCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 150,
    damping: 18,
  });

  if (reduced) {
    return <div className={cn("lift", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("lift [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
