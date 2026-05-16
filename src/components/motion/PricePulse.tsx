import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PricePulseProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

/** Цена с «живым» пульсирующим индикатором актуальности. */
export function PricePulse({ children, className, label }: PricePulseProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden className="relative flex size-2.5">
        <span className="absolute inline-flex size-full rounded-full bg-sunset/70 anim-pulse-glow" />
        <span className="relative inline-flex size-2.5 rounded-full bg-sunset" />
      </span>
      <span className="font-display font-extrabold tracking-tight text-cream">
        {children}
      </span>
      {label && <span className="text-xs text-cream/50">{label}</span>}
    </span>
  );
}
