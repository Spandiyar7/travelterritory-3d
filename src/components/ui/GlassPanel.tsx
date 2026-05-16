import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  /** Усиленный матовый фон (для модалок, выпадающих панелей) */
  strong?: boolean;
};

/** Базовая стеклянная поверхность с премиальной подсветкой. */
export function GlassPanel({
  strong = false,
  className,
  children,
  ...rest
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass-card",
        "rounded-3xl",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
