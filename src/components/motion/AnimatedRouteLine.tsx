"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

const PATHS = {
  arc: { d: "M30 150 C 360 26, 840 26, 1170 110", start: 150, end: 110 },
  wave: { d: "M30 96 C 300 14, 520 184, 760 96 S 1060 22, 1170 110", start: 96, end: 110 },
  ascent: { d: "M30 168 C 380 150, 740 86, 1170 28", start: 168, end: 28 },
};

type AnimatedRouteLineProps = {
  variant?: keyof typeof PATHS;
  className?: string;
  /** Бегущий пунктир-«поток» поверх линии */
  flow?: boolean;
};

/** Линия авиамаршрута, которая рисуется при появлении, с бегущим пунктиром. */
export function AnimatedRouteLine({
  variant = "arc",
  className,
  flow = true,
}: AnimatedRouteLineProps) {
  const reduced = useReducedMotion();
  const { d, start, end } = PATHS[variant];
  const gradientId = `tt-route-${variant}`;

  return (
    <svg
      viewBox="0 0 1200 200"
      fill="none"
      aria-hidden
      className={cn("h-auto w-full", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#11865d" />
          <stop offset="55%" stopColor="#38a7d8" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      />
      {flow && (
        <path
          d={d}
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.55"
          className="anim-dash"
        />
      )}
      <circle cx="30" cy={start} r="5" fill="#11865d" />
      <circle cx="1170" cy={end} r="6" fill="#f97316" />
    </svg>
  );
}
