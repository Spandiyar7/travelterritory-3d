"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarRange,
  Check,
  Compass,
  MessageCircle,
  ShieldQuestion,
  Wallet,
} from "lucide-react";
import type { Destination } from "@/types/destination";
import { SceneFallback } from "@/components/three/SceneFallback";
import { CountryHeroFrame } from "@/components/frames/CountryHeroFrame";
import { HotelImageFrame } from "@/components/frames/HotelImageFrame";
import { PopularResorts } from "./PopularResorts";
import { DestinationCard } from "./DestinationCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { Badge } from "@/components/ui/Badge";
import { TourRequestModal } from "@/components/forms/TourRequestModal";
import { destinationWhatsappUrl } from "@/lib/whatsapp";

const DestinationScene = dynamic(
  () =>
    import("@/components/three/DestinationScene").then(
      (m) => m.DestinationScene,
    ),
  { ssr: false, loading: () => <SceneFallback /> },
);

export function DestinationDetail({
  destination,
  related,
}: {
  destination: Destination;
  related: Destination[];
}) {
  const facts = [
    { icon: CalendarRange, label: "Лучший сезон", value: destination.bestSeason },
    { icon: Compass, label: "Кому подходит", value: destination.bestFor.join(", ") },
    { icon: Wallet, label: "Ориентир по бюджету", value: destination.budgetNote },
  ];

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-aurora opacity-70" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative">
        {/* Герой направления */}
        <section className="tt-container pb-16 pt-32">
          <Link
            href="/strany"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/60 transition-colors hover:text-turquoise"
          >
            <ArrowLeft className="size-4" />
            Все направления
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SectionReveal className="flex flex-col gap-5">
              <span className="inline-flex w-max rounded-full bg-turquoise/10 px-4 py-2 text-sm font-bold text-turquoise">
                {destination.country}
              </span>
              <h1 className="font-display text-4xl font-extrabold text-cream sm:text-5xl">
                {destination.name}
              </h1>
              <p className="text-lg leading-relaxed text-cream/70">
                {destination.longDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="info">
                  <CalendarRange className="size-3.5" />
                  {destination.bestSeason}
                </Badge>
                <Badge tone="sand">
                  <Wallet className="size-3.5" />
                  {destination.budgetNote.replace(" (демо-значение)", "")}
                </Badge>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TourRequestModal
                  label={`Подобрать тур в ${destination.name}`}
                  size="lg"
                />
                <CTAButton
                  href={destinationWhatsappUrl(destination.name)}
                  external
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </CTAButton>
              </div>
            </SectionReveal>

            <SectionReveal
              delay={0.15}
              className="relative aspect-square overflow-hidden rounded-3xl glass-card"
            >
              <DestinationScene destination={destination} />
              <span className="absolute bottom-4 left-4 rounded-lg bg-deep-navy/80 px-3 py-1.5 text-xs font-semibold text-cream/70">
                Маршрут Алматы → {destination.name}
              </span>
            </SectionReveal>
          </div>
        </section>

        {/* Быстрые факты */}
        <section className="tt-container pb-16">
          <div className="grid gap-5 sm:grid-cols-3">
            {facts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <SectionReveal key={fact.label} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-2 rounded-2xl glass-card p-5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
                      <Icon className="size-5" />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-cream/45">
                      {fact.label}
                    </p>
                    <p className="text-sm font-medium text-cream/85">
                      {fact.value}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </section>

        {/* Что важно знать */}
        <section className="tt-container pb-16">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="О направлении"
              title="Что важно знать"
            />
          </SectionReveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {destination.highlights.map((item, i) => (
              <SectionReveal key={item} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-2xl glass p-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm text-cream/80">{item}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* Курорты + визуал */}
        <section className="tt-container pb-16">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
            <SectionReveal className="flex flex-col gap-5">
              <SectionTitle
                align="left"
                eyebrow="Куда поехать"
                title="Популярные курорты"
              />
              <PopularResorts resorts={destination.popularResorts} />
              <div className="flex items-start gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4">
                <ShieldQuestion className="mt-0.5 size-5 shrink-0 text-sand" />
                <p className="text-sm leading-relaxed text-cream/65">
                  <span className="font-semibold text-cream/85">Виза:</span>{" "}
                  {destination.visaNote} Актуальные правила въезда уточняйте у
                  менеджера перед бронированием.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <CountryHeroFrame
                destination={destination}
                className="aspect-[5/4] w-full"
              />
            </SectionReveal>
          </div>
        </section>

        {/* Рекомендуемые отели */}
        <section className="tt-container pb-16">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Где жить"
              title="Рекомендуемые отели"
              subtitle="Примеры уровня размещения. Конкретный отель менеджер подберёт под ваш бюджет, даты и формат отдыха."
            />
          </SectionReveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {destination.popularResorts.slice(0, 3).map((resort, i) => (
              <SectionReveal key={resort} delay={i * 0.08}>
                <HotelImageFrame
                  name={`${resort} · отель 4–5★`}
                  className="aspect-[4/3] w-full"
                />
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="tt-container pb-16">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl glass-card p-8 text-center sm:p-12">
              <h2 className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
                Готовы поехать в {destination.name}?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-cream/65">
                Оставьте заявку — менеджер подберёт тур, отель и цену под ваш
                бюджет и даты.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <TourRequestModal label="Оставить заявку" size="lg" />
                <CTAButton
                  href={destinationWhatsappUrl(destination.name)}
                  external
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="size-4" />
                  Написать в WhatsApp
                </CTAButton>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Похожие направления */}
        {related.length > 0 && (
          <section className="tt-container pb-24">
            <SectionReveal>
              <SectionTitle
                align="left"
                eyebrow="Ещё идеи"
                title="Похожие направления"
              />
            </SectionReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <SectionReveal key={item.id} delay={i * 0.08} className="h-full">
                  <DestinationCard destination={item} />
                </SectionReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
