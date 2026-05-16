import type { Metadata } from "next";
import {
  Award,
  Headset,
  Heart,
  ShieldCheck,
  Tag,
  Zap,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { tourOperators } from "@/data/tourOperators";
import { trustStats } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "О компании",
  description:
    "Travel Territory — туристическое агентство в Алматы, основанное в 2023 году. Подбор туров, надёжные туроператоры и сопровождение туристов.",
  path: "/o-kompanii",
});

const timeline = [
  {
    year: "2023",
    title: "Основание Travel Territory",
    text: "Туристическое агентство открылось в Алматы и быстро зарекомендовало себя как надёжный партнёр в сфере туризма.",
  },
  {
    year: "2024",
    title: "Развитие онлайн-подбора и сервиса",
    text: "Усилили онлайн-подбор туров и клиентский сервис — заявку стало можно оставить в любое время.",
  },
  {
    year: "2025",
    title: "Усиление направлений и отзывов",
    text: "Расширили карту направлений, накопили опыт по курортам и отелям, собрали отзывы туристов.",
  },
  {
    year: "2026",
    title: "Современная цифровая платформа",
    text: "Запустили современный сайт-витрину с удобным подбором туров и заявкой через WhatsApp.",
  },
];

const values = [
  { icon: Heart, title: "Забота", text: "Относимся к каждому путешествию как к своему." },
  { icon: Award, title: "Экспертность", text: "Знаем направления, отели и сезоны не по картинкам." },
  { icon: ShieldCheck, title: "Надёжность", text: "Работаем только с проверенными туроператорами." },
  { icon: Zap, title: "Быстрая связь", text: "Отвечаем оперативно — удобнее всего в WhatsApp." },
  { icon: Tag, title: "Лучшие предложения", text: "Ищем оптимальную цену под ваш бюджет." },
  { icon: Headset, title: "Сопровождение", text: "На связи на каждом этапе — от заявки до возвращения." },
];

export default function OKompaniiPage() {
  return (
    <>
      <PageHeader
        eyebrow="О компании"
        title={
          <>
            Travel Territory — <span className="text-gradient">надёжный</span>{" "}
            партнёр в путешествиях
          </>
        }
        subtitle="Туристическая компания в Алматы. Помогаем подобрать туры, отели и направления под бюджет, сезон и формат отдыха."
        crumbs={[{ label: "О компании", href: "/o-kompanii" }]}
      />

      <div className="tt-container flex flex-col gap-20 py-20">
        <section className="grid gap-6 sm:grid-cols-3">
          {[
            { value: trustStats.foundedYear, label: "год основания", decimals: 0 },
            { value: 70, suffix: "+", label: "туроператоров-партнёров" },
            { value: 5, decimals: 1, label: "рейтинг в 2ГИС" },
          ].map((stat) => (
            <SectionReveal key={stat.label}>
              <div className="flex flex-col gap-1 rounded-2xl glass-card p-6 text-center">
                <span className="font-display text-4xl font-extrabold text-gradient">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix ?? ""}
                  />
                </span>
                <span className="text-sm text-cream/60">{stat.label}</span>
              </div>
            </SectionReveal>
          ))}
        </section>

        <section className="flex flex-col gap-8">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="История"
              title="Путь компании с 2023 года"
            />
          </SectionReveal>
          <div className="relative flex flex-col gap-5 pl-8">
            <span
              aria-hidden
              className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-turquoise via-sky to-sunset"
            />
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.08}>
                <div className="relative rounded-2xl glass-card p-5">
                  <span
                    aria-hidden
                    className="absolute -left-[1.85rem] top-5 size-3.5 rounded-full border-2 border-deep-navy bg-turquoise"
                  />
                  <span className="font-display text-sm font-extrabold text-turquoise">
                    {item.year}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-extrabold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                    {item.text}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Ценности"
              title="Чем мы руководствуемся"
            />
          </SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <SectionReveal key={value.title} delay={Math.min(i * 0.07, 0.35)}>
                  <div className="flex h-full flex-col gap-2.5 rounded-2xl glass-card p-6">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-base font-extrabold text-cream">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-cream/65">
                      {value.text}
                    </p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionReveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
              Работаем с надёжными туроператорами
            </p>
          </SectionReveal>
          <SectionReveal delay={0.08}>
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
        </section>

        <ContactCTA />
      </div>
    </>
  );
}
