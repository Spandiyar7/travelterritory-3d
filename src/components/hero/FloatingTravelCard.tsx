"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Tone = "ocean" | "turquoise" | "sunset" | "sky";

const tones: Record<Tone, { ring: string; glow: string }> = {
  ocean: { ring: "text-ocean", glow: "shadow-[0_22px_50px_-26px_rgba(0,166,200,0.95)]" },
  turquoise: {
    ring: "text-turquoise",
    glow: "shadow-[0_22px_50px_-26px_rgba(17,134,93,0.55)]",
  },
  sunset: {
    ring: "text-sunset",
    glow: "shadow-[0_22px_50px_-26px_rgba(249,115,22,0.55)]",
  },
  sky: { ring: "text-sky", glow: "shadow-[0_22px_50px_-26px_rgba(96,165,250,0.95)]" },
};

type FloatingTravelCardProps = {
  icon: ReactNode;
  label: string;
  sublabel: string;
  tone?: Tone;
  delay?: number;
  className?: string;
};

/** Парящая стеклянная карточка-акцент героя. */
export function FloatingTravelCard({
  icon,
  label,
  sublabel,
  tone = "ocean",
  delay = 0,
  className,
}: FloatingTravelCardProps) {
  const reduced = useReducedMotion();
  const t = tones[tone];

  const inner = (
    <div
      className={cn(
        "glass-card flex w-60 items-center gap-3 rounded-2xl p-3.5",
        t.glow,
        !reduced && "anim-float",
      )}
      style={!reduced ? { animationDelay: `${delay}s` } : undefined}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07]",
          t.ring,
        )}
      >
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-cream">{label}</p>
        <p className="text-xs text-cream/55">{sublabel}</p>
      </div>
    </div>
  );

  if (reduced) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.82, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {inner}
    </motion.div>
  );
}
