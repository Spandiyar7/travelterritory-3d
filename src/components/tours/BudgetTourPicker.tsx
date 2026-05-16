"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Wallet } from "lucide-react";
import { cn } from "@/lib/cn";
import { destinations } from "@/data/destinations";
import { buttonStyles } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/whatsapp";

const tiers = [
  {
    id: "eco",
    label: "Эконом",
    range: "до 350 000 ₸",
    slugs: ["georgia", "kazakhstan", "turkey", "egypt"],
  },
  {
    id: "comfort",
    label: "Комфорт",
    range: "350 000 – 700 000 ₸",
    slugs: ["turkey", "uae", "thailand", "vietnam"],
  },
  {
    id: "premium",
    label: "Премиум",
    range: "700 000 – 1 500 000 ₸",
    slugs: ["uae", "thailand", "indonesia", "qatar"],
  },
  {
    id: "lux",
    label: "Люкс",
    range: "от 1 500 000 ₸",
    slugs: ["maldives", "indonesia"],
  },
];

/** Подбор направлений по бюджету. */
export function BudgetTourPicker() {
  const [activeId, setActiveId] = useState(tiers[1].id);
  const tier = tiers.find((t) => t.id === activeId) ?? tiers[0];
  const matched = destinations.filter((d) => tier.slugs.includes(d.slug));

  return (
    <div className="glass-card flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {tiers.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={cn(
                "flex flex-col items-start rounded-xl border px-4 py-2.5 text-left transition-all duration-300",
                active
                  ? "border-transparent bg-[linear-gradient(135deg,#11865d,#38a7d8)] text-white"
                  : "border-white/12 bg-white/[0.04] text-cream/70 hover:border-white/25",
              )}
            >
              <span className="text-sm font-bold">{t.label}</span>
              <span
                className={cn(
                  "text-xs",
                  active ? "text-white/80" : "text-cream/45",
                )}
              >
                {t.range}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm text-cream/65">
          <Wallet className="size-4 text-turquoise" />
          Подходящие направления в бюджете «{tier.label}»:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {matched.map((d) => (
            <Link
              key={d.slug}
              href={`/strany/${d.slug}`}
              className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-cream/80 transition-colors hover:border-turquoise/40 hover:text-cream"
            >
              {d.name}
              <ArrowUpRight className="size-3.5 text-turquoise opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      <a
        href={whatsappUrl(
          `Здравствуйте! Хочу подобрать тур в бюджете «${tier.label}» (${tier.range}). Подскажите варианты.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonStyles({ variant: "whatsapp", size: "md" }), "self-start")}
      >
        <MessageCircle className="size-4" />
        Подобрать в этом бюджете
      </a>
    </div>
  );
}
