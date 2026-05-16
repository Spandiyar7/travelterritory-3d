"use client";

import { MessageCircle, Sparkles, Star } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroBadges } from "./HeroBadges";
import { whatsappUrl } from "@/lib/whatsapp";
import { trustStats } from "@/config/site";

export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-7 text-center lg:mx-0 lg:text-left">
      <span
        className="mx-auto inline-flex items-center gap-2 self-center rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-turquoise lg:mx-0 lg:self-start"
      >
        <Sparkles className="size-3.5" />
        Подбор тура бесплатно
      </span>

      <h1 className="max-w-[calc(100vw-2.5rem)] font-display text-[2.15rem] font-extrabold leading-[1.06] text-cream sm:text-5xl lg:text-[3.9rem]">
        <span className="block sm:hidden">Туры из</span>
        <span className="block sm:hidden">Алматы</span>
        <span className="block sm:hidden">под ваш</span>
        <span className="block text-gradient-sun sm:hidden">бюджет</span>
        <span className="hidden sm:block">Туры из Алматы</span>
        <span className="hidden sm:block">
          под ваш <span className="text-gradient-sun">бюджет</span>
        </span>
      </h1>

      <p
        className="mx-auto max-w-[21rem] text-pretty text-base leading-relaxed text-cream/70 sm:max-w-lg sm:text-lg lg:mx-0"
      >
        Скажите даты, бюджет и формат отдыха — менеджер пришлёт 3–5 подходящих
        вариантов с перелётом, отелем и понятной ценой.
      </p>

      <div
        className="flex flex-col items-center gap-3 sm:flex-row lg:items-start"
      >
        <MagneticButton>
          <CTAButton href="/podbor-tura" variant="primary" size="lg">
            <Sparkles className="size-4" />
            Получить подборку
          </CTAButton>
        </MagneticButton>
        <MagneticButton>
          <CTAButton
            href={whatsappUrl()}
            external
            variant="whatsapp"
            size="lg"
          >
            <MessageCircle className="size-4" />
            Написать менеджеру
          </CTAButton>
        </MagneticButton>
      </div>

      <div
        className="mx-auto flex max-w-[21rem] flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-cream/55 sm:max-w-lg lg:mx-0 lg:justify-start"
      >
        <span className="flex items-center gap-1 font-bold text-sand">
          <Star className="size-4 fill-sand" />
          {trustStats.twoGisRating.toFixed(1)}
        </span>
        <span className="hidden sm:inline">
          в 2ГИС · {trustStats.twoGisReviewsCount} отзывов · проверяем цены до брони
        </span>
        <span className="sm:hidden">
          в 2ГИС · {trustStats.twoGisReviewsCount} отзывов
        </span>
      </div>

      <div>
        <HeroBadges />
      </div>
    </div>
  );
}
