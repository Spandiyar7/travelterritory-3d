import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/** Заголовок секции: надзаголовок-«eyebrow» + заголовок + подзаголовок. */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as = "h2",
  className,
}: SectionTitleProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">
          <span aria-hidden className="h-px w-7 bg-turquoise/60" />
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          "max-w-3xl text-balance font-display font-extrabold text-cream",
          as === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.7rem]",
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-cream/65 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
