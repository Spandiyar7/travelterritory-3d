import { ArrowRight, Info } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { RouteOverlay } from "@/components/motion/RouteOverlay";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { HotTourCard } from "@/components/tours/HotTourCard";
import { hotTours } from "@/data/hotTours";

/** Стадия 3 — горящие туры: 3D-карточки с пульсом цены над маршрутами. */
export function HotToursPreview() {
  const tours = hotTours.slice(0, 6);

  return (
    <TravelSectionTrigger
      id="goryashchie-tury"
      tone="veil"
      className="py-20 sm:py-28"
    >
      <RouteOverlay className="opacity-60" />
      <div className="tt-container relative">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Горящие туры"
              title={
                <>
                  Туры, которые чаще всего{" "}
                  <span className="text-gradient-sun">разбирают первыми</span>
                </>
              }
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <CTAButton href="/goryashchie-tury" variant="outline">
              Все горящие туры
              <ArrowRight className="size-4" />
            </CTAButton>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.05}>
          <p className="mt-5 flex items-center gap-2 text-sm text-cream/55">
            <Info className="size-4 shrink-0 text-sand" />
            Цены и места меняются каждый день — менеджер подтвердит актуальный
            вариант перед бронированием.
          </p>
        </SectionReveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <SectionReveal
              key={tour.id}
              delay={Math.min(i * 0.07, 0.35)}
              className="h-full"
            >
              <HotTourCard tour={tour} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </TravelSectionTrigger>
  );
}
