import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ReviewPostcardFrameProps = {
  children: ReactNode;
  className?: string;
  accent?: string;
};

/** Оболочка отзыва в стиле дорожной открытки — со штампом и марш-линией. */
export function ReviewPostcardFrame({
  children,
  className,
  accent = "#11865d",
}: ReviewPostcardFrameProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl glass-card p-6 lift",
        className,
      )}
    >
      {/* Перфорированная кромка-открытка */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-1.5"
        style={{ backgroundColor: accent }}
      />
      <div
        aria-hidden
        className="absolute left-3 top-0 h-full w-px border-l border-dashed border-white/15"
      />

      {/* Угловой «штамп» */}
      <div
        aria-hidden
        className="absolute right-5 top-5 flex size-12 rotate-[14deg] items-center justify-center rounded-md border-2 border-dashed text-[0.5rem] font-bold uppercase leading-tight tracking-wider"
        style={{ borderColor: `${accent}66`, color: `${accent}cc` }}
      >
        Travel
        <br />
        Story
      </div>

      <div className="relative pl-3">{children}</div>

      {/* Марш-линия снизу */}
      <svg
        aria-hidden
        viewBox="0 0 300 20"
        className="absolute inset-x-0 bottom-0 h-4 w-full opacity-50"
        fill="none"
      >
        <path
          d="M0 14 C 80 2, 220 2, 300 12"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
      </svg>
    </div>
  );
}
