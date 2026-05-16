"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel?: string;
};

/** Группа таб-пилюль для фильтров и переключателей. */
export function Tabs({ tabs, value, onChange, className, ariaLabel }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "no-scrollbar flex max-w-full gap-2 overflow-x-auto rounded-full glass p-1.5",
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
              active
                ? "bg-[linear-gradient(135deg,#11865d,#38a7d8)] text-white shadow-[0_8px_22px_-10px_rgba(17,134,93,0.65)]"
                : "text-cream/65 hover:bg-white/5 hover:text-cream",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
