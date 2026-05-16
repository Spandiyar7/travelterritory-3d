import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { AppRoute } from "@/data/navigation";
import { RouteOverlay } from "@/components/motion/RouteOverlay";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AnimatedRouteLine } from "@/components/motion/AnimatedRouteLine";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

type Crumb = { label: string; href: AppRoute };

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
};

/** Единый заголовок-шапка для внутренних страниц. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 pb-16 pt-32">
      <div aria-hidden className="absolute inset-0 bg-aurora" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
      <RouteOverlay className="opacity-45" />

      <div className="tt-container relative">
        <nav
          aria-label="Хлебные крошки"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-cream/45"
        >
          <Link href="/" className="transition-colors hover:text-turquoise">
            Главная
          </Link>
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="size-3" />
              {i === crumbs.length - 1 ? (
                <span className="text-cream/75">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-turquoise"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <SectionReveal className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-turquoise">
            <span aria-hidden className="h-px w-7 bg-turquoise/60" />
            {eyebrow}
          </span>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-extrabold text-cream sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-cream/65 sm:text-lg">
              {subtitle}
            </p>
          )}
        </SectionReveal>

        <AnimatedRouteLine
          variant="arc"
          className="mt-8 max-w-xl opacity-55"
        />
      </div>

      {crumbs.length > 0 && (
        <JsonLd
          data={breadcrumbSchema([
            { name: "Главная", path: "/" },
            ...crumbs.map((c) => ({ name: c.label, path: c.href })),
          ])}
        />
      )}
    </header>
  );
}
