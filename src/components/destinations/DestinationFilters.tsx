"use client";

import { cn } from "@/lib/cn";

const filters = [
  { value: "all", label: "Все направления" },
  { value: "beach", label: "Пляжный" },
  { value: "family", label: "Семейный" },
  { value: "luxury", label: "Люкс" },
  { value: "sightseeing", label: "Экскурсии" },
  { value: "visa-free", label: "Без визы" },
  { value: "winter", label: "Зимой" },
  { value: "summer", label: "Летом" },
];

type DestinationFiltersProps = {
  value: string;
  onChange: (value: string) => void;
};

/** Чип-фильтры каталога направлений по типу отдыха. */
export function DestinationFilters({ value, onChange }: DestinationFiltersProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => {
        const active = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
              active
                ? "border-transparent bg-[linear-gradient(135deg,#11865d,#38a7d8)] text-white shadow-[0_10px_26px_-12px_rgba(17,134,93,0.65)]"
                : "border-white/12 bg-white/[0.04] text-cream/65 hover:border-white/25 hover:text-cream",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
