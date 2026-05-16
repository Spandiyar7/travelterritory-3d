"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ScrollMarqueeProps = {
  items: ReactNode[];
  className?: string;
  reverse?: boolean;
};

/** Один ряд бегущей строки. */
function MarqueeRow({
  items,
  hidden,
}: {
  items: ReactNode[];
  hidden?: boolean;
}) {
  return (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-x-10 px-5"
    >
      {items.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}

/** Бесконечная бегущая строка. В reduced-motion — статичный перенос по строкам. */
export function ScrollMarquee({
  items,
  className,
  reverse = false,
}: ScrollMarqueeProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-10 gap-y-4",
          className,
        )}
      >
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 anim-marquee",
          reverse && "[animation-direction:reverse]",
        )}
      >
        <MarqueeRow items={items} />
        <MarqueeRow items={items} hidden />
      </div>
    </div>
  );
}
