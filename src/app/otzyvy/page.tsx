import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { ReviewsGrid } from "@/components/reviews/ReviewsGrid";
import { ReviewsWidgetPlaceholder } from "@/components/reviews/ReviewsWidgetPlaceholder";

export const metadata: Metadata = createMetadata({
  title: "Отзывы туристов",
  description:
    "Отзывы туристов о Travel Territory. Рейтинг 5.0 в 2ГИС. Истории путешествий и подбора туров.",
  path: "/otzyvy",
});

export default function OtzyvyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Отзывы"
        title={
          <>
            Истории туристов{" "}
            <span className="text-gradient">Travel Territory</span>
          </>
        }
        subtitle="Туристы делятся впечатлениями о подборе туров, отелях и сопровождении в поездке."
        crumbs={[{ label: "Отзывы", href: "/otzyvy" }]}
      />

      <div className="tt-container flex flex-col gap-12 py-20">
        <SectionReveal>
          <ReviewsWidgetPlaceholder />
        </SectionReveal>
        <ReviewsGrid />
        <ContactCTA
          title="Хотите так же отдохнуть?"
          text="Оставьте заявку — подберём тур, который захочется потом рекомендовать."
        />
      </div>
    </>
  );
}
