import { ArrowRight } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewsWidgetPlaceholder } from "@/components/reviews/ReviewsWidgetPlaceholder";
import { reviews } from "@/data/reviews";

/** Стадия 7 — отзывы: дорожные открытки + место для виджета. */
export function ReviewsPreview() {
  const featured = reviews.slice(0, 3);

  return (
    <TravelSectionTrigger id="otzyvy" tone="veil" className="py-20 sm:py-28">
      <div className="tt-container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Отзывы"
              title={
                <>
                  Истории туристов{" "}
                  <span className="text-gradient">Travel Territory</span>
                </>
              }
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <CTAButton href="/otzyvy" variant="outline">
              Все отзывы
              <ArrowRight className="size-4" />
            </CTAButton>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.05} className="mt-7">
          <ReviewsWidgetPlaceholder />
        </SectionReveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((review, i) => (
            <SectionReveal key={review.id} delay={i * 0.08} className="h-full">
              <ReviewCard review={review} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </TravelSectionTrigger>
  );
}
