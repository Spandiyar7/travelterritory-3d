"use client";

import { useMemo, useState } from "react";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";
import { Tabs } from "@/components/ui/Tabs";
import { SectionReveal } from "@/components/motion/SectionReveal";

/** Стена отзывов с фильтром по источнику. */
export function ReviewsGrid() {
  const [source, setSource] = useState("Все");

  const sources = useMemo(
    () => ["Все", ...new Set(reviews.map((r) => r.source))],
    [],
  );
  const filtered =
    source === "Все" ? reviews : reviews.filter((r) => r.source === source);

  return (
    <div className="flex flex-col gap-7">
      <Tabs
        tabs={sources.map((s) => ({ id: s, label: s }))}
        value={source}
        onChange={setSource}
        ariaLabel="Фильтр отзывов по источнику"
        className="self-center"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((review, i) => (
          <SectionReveal
            key={review.id}
            delay={Math.min(i * 0.05, 0.3)}
            className="h-full"
          >
            <ReviewCard review={review} />
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
