import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { TourRequestForm } from "@/components/tours/TourRequestForm";
import { BudgetTourPicker } from "@/components/tours/BudgetTourPicker";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { destinations } from "@/data/destinations";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "Подбор тура",
  description:
    "Подберём тур, отель и направление под ваш бюджет и даты. Оставьте заявку — менеджер Travel Territory пришлёт лучшие варианты от надёжных туроператоров.",
  path: "/podbor-tura",
});

const advantages = [
  "Сравним предложения более чем 70 туроператоров",
  "Учтём бюджет, даты, состав и формат отдыха",
  "Подскажем по отелям, которые видели сами",
  "Поможем с визой, страховкой, трансфером и билетами",
];

export default function PodborTuraPage() {
  return (
    <>
      <PageHeader
        eyebrow="Подбор тура"
        title={
          <>
            Заявка на подбор тура{" "}
            <span className="text-gradient">под ваш бюджет</span>
          </>
        }
        subtitle="Заполните параметры путешествия — менеджер подберёт варианты и пришлёт их в WhatsApp. Подбор бесплатный."
        crumbs={[{ label: "Подбор тура", href: "/podbor-tura" }]}
      />

      <div className="tt-container flex flex-col gap-20 py-20">
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionReveal className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-extrabold text-cream">
              Почему стоит доверить подбор профессионалам
            </h2>
            <ul className="flex flex-col gap-3">
              {advantages.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-cream/75">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 rounded-2xl glass p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-sunset/15 text-sunset">
                <Sparkles className="size-5" />
              </span>
              <p className="text-sm text-cream/70">
                Онлайн-поиск туров 24/7 — оставляйте заявку в удобное время.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.12}>
            <TourRequestForm />
          </SectionReveal>
        </section>

        <section className="flex flex-col gap-7">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Бюджет"
              title="Подбор направления по бюджету"
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <BudgetTourPicker />
          </SectionReveal>
        </section>

        <section className="flex flex-col gap-7">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Идеи для отдыха"
              title="Популярные направления"
            />
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 8).map((destination, i) => (
              <SectionReveal
                key={destination.id}
                delay={Math.min(i * 0.05, 0.3)}
                className="h-full"
              >
                <DestinationCard destination={destination} priority={i < 4} />
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-7">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="FAQ"
              title="Частые вопросы о подборе тура"
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <FaqAccordion items={faqItems} />
          </SectionReveal>
        </section>

        <ContactCTA />
      </div>
    </>
  );
}
