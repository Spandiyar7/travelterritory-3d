"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type FloatingBadgeProps = {
  icon?: ReactNode;
  label: string;
  sublabel?: string;
  className?: string;
  delay?: number;
  tone?: "ocean" | "sunset" | "turquoise" | "sky";
};

const tones = {
  ocean: "text-ocean",
  sunset: "text-sunset",
  turquoise: "text-turquoise",
  sky: "text-sky",
};

/** Плавающая стеклянная карточка-акцент (используется в герое и секциях). */
export function FloatingBadge({
  icon,
  label,
  sublabel,
  className,
  delay = 0,
  tone = "ocean",
}: FloatingBadgeProps) {
  const reduced = useReducedMotion();

  const inner = (
    <div
      className={cn(
        "glass-card flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_22px_46px_-26px_rgba(0,0,0,0.95)]",
        !reduced && "anim-float",
      )}
      style={!reduced ? { animationDelay: `${delay}s` } : undefined}
    >
      {icon && (
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]",
            tones[tone],
          )}
        >
          {icon}
        </span>
      )}
      <div className="leading-tight">
        <p className="text-sm font-bold text-cream">{label}</p>
        {sublabel && <p className="text-xs text-cream/55">{sublabel}</p>}
      </div>
    </div>
  );

  if (reduced) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.84, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {inner}
    </motion.div>
  );
}
