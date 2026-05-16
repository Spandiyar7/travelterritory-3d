"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldBaseClass } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export type HotToursFilterState = {
  query: string;
  country: string;
  sort: string;
};

const sortOptions = [
  { value: "popular", label: "Сначала популярные" },
  { value: "cheap", label: "Сначала дешевле" },
  { value: "expensive", label: "Сначала дороже" },
  { value: "new", label: "Сначала новые" },
];

type HotToursFiltersProps = HotToursFilterState & {
  countries: string[];
  onChange: (next: Partial<HotToursFilterState>) => void;
};

/** Панель фильтров горящих туров: поиск, страна, сортировка. */
export function HotToursFilters({
  query,
  country,
  sort,
  countries,
  onChange,
}: HotToursFiltersProps) {
  return (
    <div className="glass-card grid gap-4 rounded-2xl p-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="hot-search"
          className="text-sm font-medium text-cream/80"
        >
          Поиск тура
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
          <input
            id="hot-search"
            value={query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Курорт, страна или отель"
            className={cn(fieldBaseClass, "h-12 pl-10 pr-4 text-[0.95rem]")}
          />
        </div>
      </div>
      <Select
        label="Страна"
        value={country}
        onChange={(e) => onChange({ country: e.target.value })}
        placeholder="Все страны"
        options={countries.map((c) => ({ value: c, label: c }))}
      />
      <Select
        label="Сортировка"
        value={sort}
        onChange={(e) => onChange({ sort: e.target.value })}
        options={sortOptions}
      />
    </div>
  );
}
