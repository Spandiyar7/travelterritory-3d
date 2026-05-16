import { Check, Sparkles } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { TourRequestForm } from "@/components/tours/TourRequestForm";
import { trustStats } from "@/config/site";

const benefits = [
  {
    title: "3–5 вариантов",
    text: "Сразу с перелётом, отелем, питанием и итоговой ценой.",
  },
  {
    title: "Честное сравнение",
    text: "Проверяем предложения у 70+ туроператоров, а не показываем один вариант.",
  },
  {
    title: "Отель без сюрпризов",
    text: "Подскажем, где хороший пляж, питание, детская зона и удобный район.",
  },
  {
    title: "Бронь с менеджером",
    text: "Поможем с оплатой, документами, страховкой и вопросами до вылета.",
  },
];

/** Стадия 2 — подбор тура: стеклянная «панель управления путешествием». */
export function TourSearchSection() {
  return (
    <TravelSectionTrigger id="podbor-tura" tone="panel" className="py-20 sm:py-28">
      <div className="tt-container">
        <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <SectionReveal className="flex flex-col gap-5">
            <SectionTitle
              align="left"
              eyebrow="Подбор тура"
              title={
                <>
                  Оставьте заявку —{" "}
                  <span className="text-gradient">мы всё сравним</span>
                </>
              }
              subtitle="Не тратьте вечер на десятки вкладок. Напишите параметры поездки, а менеджер соберёт короткую подборку туров в WhatsApp."
            />

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-3 rounded-2xl bg-white/65 p-4 ring-1 ring-turquoise/10">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-3.5" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-cream">{benefit.title}</span>
                    <span className="text-sm leading-relaxed text-cream/65">
                      {benefit.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-1 flex items-center gap-3 rounded-2xl glass p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
                <Sparkles className="size-5" />
              </span>
              <p className="text-sm text-cream/70">
                Подбор тура{" "}
                <span className="font-bold text-cream">бесплатный</span> —
                рейтинг {trustStats.twoGisRating.toFixed(1)} в 2ГИС и{" "}
                {trustStats.twoGisReviewsCount} отзывов.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <TourRequestForm />
          </SectionReveal>
        </div>
      </div>
    </TravelSectionTrigger>
  );
}
