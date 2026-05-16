import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTone = "transparent" | "veil" | "panel";

/** Полупрозрачные «вуали» поверх глобальной 3D-сцены — для читаемости контента. */
const toneClass: Record<SectionTone, string> = {
  transparent: "",
  veil: "bg-[linear-gradient(180deg,rgba(243,251,246,0.48),rgba(243,251,246,0.88)_45%,rgba(243,251,246,0.62))]",
  panel: "bg-white/80",
};

type TravelSectionTriggerProps = {
  id?: string;
  children: ReactNode;
  /** transparent — сцена видна полностью; veil — контент читаем; panel — плотный фон */
  tone?: SectionTone;
  className?: string;
};

/**
 * Секция-обёртка главной страницы. Лежит поверх фиксированной 3D-сцены
 * и задаёт фон-«вуаль», чтобы контент оставался читаемым.
 */
export function TravelSectionTrigger({
  id,
  children,
  tone = "veil",
  className,
}: TravelSectionTriggerProps) {
  return (
    <section id={id} className={cn("relative", className)}>
      {tone !== "transparent" && (
        <div aria-hidden className={cn("absolute inset-0", toneClass[tone])} />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}
