"use client";

import { useMemo, useState } from "react";
import { Info, SearchX } from "lucide-react";
import { hotTours } from "@/data/hotTours";
import { HotTourCard } from "./HotTourCard";
import {
  HotToursFilters,
  type HotToursFilterState,
} from "./HotToursFilters";
import { SectionReveal } from "@/components/motion/SectionReveal";

/** Каталог горящих туров с поиском, фильтром по стране и сортировкой. */
export function HotToursGrid() {
  const [filters, setFilters] = useState<HotToursFilterState>({
    query: "",
    country: "",
    sort: "popular",
  });

  const countries = useMemo(
    () => [...new Set(hotTours.map((t) => t.country))].sort(),
    [],
  );

  const result = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    let list = hotTours.filter((tour) => {
      const matchesCountry = !filters.country || tour.country === filters.country;
      const matchesQuery =
        !q ||
        `${tour.destination} ${tour.country} ${tour.hotel}`
          .toLowerCase()
          .includes(q);
      return matchesCountry && matchesQuery;
    });
    if (filters.sort === "cheap")
      list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    else if (filters.sort === "expensive")
      list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
    else if (filters.sort === "new")
      list = [...list].sort(
        (a, b) =>
          (b.badge === "Новинка" ? 1 : 0) - (a.badge === "Новинка" ? 1 : 0),
      );
    return list;
  }, [filters]);

  return (
    <div className="flex flex-col gap-7">
      <HotToursFilters
        {...filters}
        countries={countries}
        onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
      />

      <p className="flex items-center gap-2 rounded-xl border border-turquoise/15 bg-white/60 px-4 py-3 text-sm text-cream/55">
        <Info className="size-4 shrink-0 text-sand" />
        Цены ориентировочные: актуальную стоимость, рейс и наличие мест
        подтвердит менеджер перед бронированием.
      </p>

      {result.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl glass py-16 text-center">
          <SearchX className="size-8 text-cream/40" />
          <p className="text-cream/60">
            По вашему запросу туров не найдено. Попробуйте изменить фильтры.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((tour, i) => (
            <SectionReveal
              key={tour.id}
              delay={Math.min(i * 0.05, 0.3)}
              className="h-full"
            >
              <HotTourCard tour={tour} />
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  );
}
