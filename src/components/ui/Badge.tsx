import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "hot" | "success" | "info" | "sand";

const tones: Record<BadgeTone, string> = {
  neutral: "border-white/12 bg-white/[0.05] text-cream/80",
  hot: "border-sunset/40 bg-sunset/15 text-sunset",
  success: "border-success/40 bg-success/15 text-success",
  info: "border-sky/40 bg-sky/15 text-sky",
  sand: "border-sand/40 bg-sand/15 text-sand",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-tight",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-current anim-pulse-glow"
        />
      )}
      {children}
    </span>
  );
}
