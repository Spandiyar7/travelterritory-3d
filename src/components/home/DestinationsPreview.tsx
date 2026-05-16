import { ArrowRight } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { destinations } from "@/data/destinations";

/** Стадия 4 — страны: стена направлений, выбор страны «визуально». */
export function DestinationsPreview() {
  const list = destinations.slice(0, 8);

  return (
    <TravelSectionTrigger id="strany" tone="veil" className="py-20 sm:py-28">
      <div className="tt-container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Страны и направления"
              title={
                <>
                  Выберите страну —{" "}
                  <span className="text-gradient">мы соберём тур</span>
                </>
              }
              subtitle="Фото, сезон, курорты и бюджет по каждому направлению. Сравните варианты и оставьте заявку на подбор."
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <CTAButton href="/strany" variant="outline">
              Все направления
              <ArrowRight className="size-4" />
            </CTAButton>
          </SectionReveal>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((destination, i) => (
            <SectionReveal
              key={destination.id}
              delay={Math.min(i * 0.06, 0.36)}
              className="h-full"
            >
              <DestinationCard destination={destination} priority={i < 4} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </TravelSectionTrigger>
  );
}
