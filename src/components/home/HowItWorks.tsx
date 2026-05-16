import { FileCheck2, MessagesSquare, Plane, Send } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AnimatedRouteLine } from "@/components/motion/AnimatedRouteLine";

const steps = [
  {
    icon: Send,
    title: "Оставляете заявку",
    text: "Страна, даты, бюджет и состав путешественников.",
  },
  {
    icon: MessagesSquare,
    title: "Уточняем детали",
    text: "Пляж, питание, район, детская инфраструктура, экскурсии.",
  },
  {
    icon: FileCheck2,
    title: "Присылаем подборку",
    text: "3–5 туров с понятной разницей по цене и качеству.",
  },
  {
    icon: Plane,
    title: "Бронируем и летим",
    text: "Оплата, документы, страховка и поддержка до вылета.",
  },
];

/** Стадия 6 — как это работает: маршрут-путешествие из 4 этапов. */
export function HowItWorks() {
  return (
    <TravelSectionTrigger id="kak-rabotaet" tone="veil" className="py-20 sm:py-28">
      <div className="tt-container">
        <SectionReveal>
          <SectionTitle
            eyebrow="Как это работает"
            title={
              <>
                Ваш маршрут — от заявки до{" "}
                <span className="text-gradient">путешествия</span>
              </>
            }
            subtitle="Четыре шага без хаоса: от заявки до готового маршрута."
          />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <AnimatedRouteLine
            variant="ascent"
            className="mx-auto mt-8 hidden max-w-5xl opacity-60 lg:block"
          />
        </SectionReveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <SectionReveal
                key={step.title}
                delay={Math.min(i * 0.1, 0.45)}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col gap-3 rounded-2xl glass-card p-5 lift hover:-translate-y-1.5">
                  {/* Штамп-номер этапа */}
                  <span className="absolute -right-2 -top-2 flex size-10 rotate-[-10deg] items-center justify-center rounded-full border-2 border-dashed border-turquoise/45 bg-deep-navy/85 font-display text-sm font-extrabold text-turquoise">
                    0{i + 1}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-turquoise/12 text-turquoise">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display text-base font-extrabold leading-tight text-cream">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/60">
                    {step.text}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </TravelSectionTrigger>
  );
}
