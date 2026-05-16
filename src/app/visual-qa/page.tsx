import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Eye, Phone, Snowflake } from "lucide-react";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { PageHeader } from "@/components/layout/PageHeader";
import { HeroContent } from "@/components/hero/HeroContent";
import { FloatingTravelCard } from "@/components/hero/FloatingTravelCard";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { HotTourCard } from "@/components/tours/HotTourCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { TourRequestForm } from "@/components/tours/TourRequestForm";
import { AnimatedRouteLine } from "@/components/motion/AnimatedRouteLine";
import { SceneFallback } from "@/components/three/SceneFallback";
import { destinations } from "@/data/destinations";
import { hotTours } from "@/data/hotTours";
import { reviews } from "@/data/reviews";
import { QaScene } from "./QaScene";

export const metadata: Metadata = createMetadata({
  title: "Визуальный QA",
  description: "Страница инспекции компонентов Travel Territory.",
  path: "/visual-qa",
  noIndex: true,
});

function QaTile({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-turquoise/75">
        {label}
      </span>
      <div className="rounded-2xl border border-white/10 bg-deep-navy/70 p-5">
        {children}
      </div>
    </div>
  );
}

export default function VisualQaPage() {
  return (
    <>
      <PageHeader
        eyebrow="QA"
        title="Визуальный QA"
        subtitle="Страница инспекции ключевых компонентов и 3D-моделей Travel Territory."
        crumbs={[{ label: "Visual QA", href: "/visual-qa" }]}
      />

      <div className="tt-container flex flex-col gap-10 py-16">
        {/* Инструкция по режимам */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Eye,
              code: "?qa=1",
              text: "Полный QA-режим: сцена замерзает, Lenis отключён, анимации остановлены.",
            },
            {
              icon: Snowflake,
              code: "?scene=freeze",
              text: "Заморозить только 3D-сцену в хорошем кадре.",
            },
            {
              icon: Eye,
              code: "?motion=off",
              text: "Отключить анимации (как prefers-reduced-motion).",
            },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.code}
                className="flex flex-col gap-2 rounded-2xl glass-card p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-turquoise/15 text-turquoise">
                  <Icon className="size-4" />
                </span>
                <code className="font-mono text-sm font-bold text-cream">
                  {mode.code}
                </code>
                <p className="text-xs leading-relaxed text-cream/60">
                  {mode.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-dashed border-white/20 glass p-5 text-sm text-cream/65">
          Замороженный режим главной страницы:{" "}
          <Link
            href={{
              pathname: "/",
              query: { qa: "1", motion: "off", scene: "freeze" },
            }}
            className="font-semibold text-turquoise"
          >
            /?qa=1&motion=off&scene=freeze
          </Link>
          . Глобальная 3D-сцена остановится в хорошем кадре, контент останется
          видимым — удобно для скриншотов.
        </div>

        {/* 3D-сцена */}
        <QaTile label="3D-сцена путешествия — глобус, атмосфера, маршрут, пины">
          <QaScene />
        </QaTile>

        {/* Герой desktop / mobile */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <QaTile label="Герой — desktop">
            <div className="rounded-xl bg-[radial-gradient(60%_60%_at_70%_30%,rgba(0,166,200,0.2),transparent)] p-6">
              <HeroContent />
            </div>
          </QaTile>
          <QaTile label="Герой — mobile">
            <div className="mx-auto max-w-sm rounded-xl bg-[radial-gradient(70%_50%_at_50%_20%,rgba(0,166,200,0.2),transparent)] p-5">
              <HeroContent />
            </div>
          </QaTile>
        </div>

        {/* Карточки */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <QaTile label="Карточка направления">
            <DestinationCard destination={destinations[0]} />
          </QaTile>
          <QaTile label="Карточка горящего тура">
            <HotTourCard tour={hotTours[0]} />
          </QaTile>
          <QaTile label="Карточка отзыва">
            <ReviewCard review={reviews[0]} />
          </QaTile>
        </div>

        {/* Форма */}
        <QaTile label="Форма подбора тура">
          <TourRequestForm embedded />
        </QaTile>

        {/* Прочее */}
        <div className="grid gap-6 lg:grid-cols-2">
          <QaTile label="Плавающая карточка героя">
            <FloatingTravelCard
              icon={<Eye className="size-5" />}
              label="Горящие туры"
              sublabel="Цены ниже на 20–40%"
              tone="sunset"
            />
          </QaTile>
          <QaTile label="Контактная карточка">
            <div className="flex items-center gap-3 rounded-2xl glass-card p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
                <Phone className="size-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-cream/45">
                  Телефон
                </p>
                <p className="text-sm font-medium text-cream/85">
                  +7 (747) 184-50-00
                </p>
              </div>
            </div>
          </QaTile>
        </div>

        <QaTile label="Анимированная линия маршрута">
          <AnimatedRouteLine variant="arc" />
        </QaTile>

        <QaTile label="Reduced-motion / не-WebGL фолбэк сцены">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-deep-navy">
            <SceneFallback />
          </div>
          <p className="mt-3 text-xs text-cream/55">
            Эта заглушка показывается при загрузке 3D-чанка и при отсутствии
            WebGL. В режиме <code className="text-turquoise">?motion=off</code>{" "}
            анимации страницы остановлены.
          </p>
        </QaTile>
      </div>
    </>
  );
}
