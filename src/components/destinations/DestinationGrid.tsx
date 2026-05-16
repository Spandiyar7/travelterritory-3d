"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { DestinationTag } from "@/types/destination";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";
import { DestinationFilters } from "./DestinationFilters";
import { SectionReveal } from "@/components/motion/SectionReveal";

/** Каталог направлений с фильтром по типу отдыха. */
export function DestinationGrid() {
  const [tag, setTag] = useState("all");

  const result = useMemo(() => {
    if (tag === "all") return destinations;
    return destinations.filter((d) =>
      d.tags.includes(tag as DestinationTag),
    );
  }, [tag]);

  return (
    <div className="flex flex-col gap-7">
      <DestinationFilters value={tag} onChange={setTag} />

      {result.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl glass py-16 text-center">
          <SearchX className="size-8 text-cream/40" />
          <p className="text-cream/60">
            Направлений с таким фильтром нет — выберите другой тип отдыха.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((destination, i) => (
            <SectionReveal
              key={destination.id}
              delay={Math.min(i * 0.04, 0.28)}
              className="h-full"
            >
              <DestinationCard destination={destination} priority={i < 3} />
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  );
}
