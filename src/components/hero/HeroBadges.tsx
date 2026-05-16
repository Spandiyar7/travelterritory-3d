"use client";

import { Building2, Clock, PlaneTakeoff, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const badges = [
  { icon: Building2, label: "70+ туроператоров" },
  { icon: Wallet, label: "Без скрытых расходов" },
  { icon: PlaneTakeoff, label: "Вылеты из Алматы" },
  { icon: Clock, label: "Ответ за 15 минут" },
];

/** Ряд бейджей-преимуществ под заголовком героя. */
export function HeroBadges() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2.5">
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        const chip = (
          <span className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-cream/85">
            <Icon className="size-3.5 text-turquoise" />
            {badge.label}
          </span>
        );
        if (reduced) return <div key={badge.label}>{chip}</div>;
        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 + i * 0.1, duration: 0.5 }}
          >
            {chip}
          </motion.div>
        );
      })}
    </div>
  );
}
