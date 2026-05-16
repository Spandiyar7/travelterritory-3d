import { ArrowRight } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { trustStats } from "@/config/site";
import { tourOperators } from "@/data/tourOperators";

/** Стадия 7–8 — о компании: история, цифры доверия, туроператоры. */
export function AboutPreview() {
  const stats = [
    { value: 70, suffix: "+", label: "туроператоров-партнёров" },
    { value: 5, decimals: 1, label: "рейтинг в 2ГИС" },
    { value: trustStats.twoGisReviewsCount, label: "отзывов туристов" },
    { value: trustStats.twoGisRatingsCount, label: "оценок в 2ГИС" },
  ];

  return (
    <TravelSectionTrigger id="o-kompanii" tone="panel" className="py-20 sm:py-28">
      <div className="tt-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionReveal className="flex flex-col gap-5">
            <SectionTitle
              align="left"
              eyebrow="О компании"
              title={
                <>
                  Travel Territory —{" "}
                  <span className="text-gradient">ваш проводник</span> в
                  путешествия
                </>
              }
            />
            <p className="text-base leading-relaxed text-cream/70">
              Travel Territory — туристическая компания в Алматы, которая
              помогает подобрать туры, отели и направления под бюджет, сезон и
              формат отдыха. Мы работаем с надёжными туроператорами и
              сопровождаем туристов на всех этапах путешествия.
            </p>
            <CTAButton href="/o-kompanii" variant="primary" className="self-start">
              О компании
              <ArrowRight className="size-4" />
            </CTAButton>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-2xl glass-card p-5"
                >
                  <span className="font-display text-3xl font-extrabold text-gradient">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                    />
                  </span>
                  <span className="text-sm text-cream/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.1} className="mt-12">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
            Работаем с надёжными туроператорами
          </p>
          <ScrollMarquee
            items={tourOperators.map((op) => (
              <span
                key={op.id}
                className="font-display text-lg font-extrabold text-cream/45"
              >
                {op.name}
              </span>
            ))}
          />
        </SectionReveal>
      </div>
    </TravelSectionTrigger>
  );
}
