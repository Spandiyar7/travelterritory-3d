import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, Clock, Plane } from "lucide-react";
import { siteConfig, contactLinks, trustStats, paymentMethods } from "@/config/site";
import { navItems, legalLinks } from "@/data/navigation";
import { destinations } from "@/data/destinations";
import { tourOperators } from "@/data/tourOperators";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  const featured = destinations.slice(0, 6);

  return (
    <footer className="relative z-10 mt-px border-t border-turquoise/10 bg-midnight/95">
      <div className="bg-grid">
        <div className="tt-container py-16">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
            {/* Бренд */}
            <div className="flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#11865d,#38a7d8)]">
                  <Plane className="size-5 text-white" />
                </span>
                <span className="font-display text-lg font-extrabold text-cream">
                  Travel Territory
                </span>
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-cream/60">
                Туристическая компания в Алматы. Подбираем туры, отели и
                направления под ваш бюджет, сезон и формат отдыха.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-lg bg-sand/15 px-2.5 py-1 font-bold text-sand">
                  {trustStats.twoGisRating.toFixed(1)} ★
                </span>
                <span className="text-cream/55">
                  {trustStats.twoGisReviewsCount} отзывов в 2ГИС
                </span>
              </div>
            </div>

            {/* Навигация */}
            <nav className="flex flex-col gap-3" aria-label="Разделы сайта">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream">
                Разделы
              </h3>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-cream/60 transition-colors hover:text-turquoise"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Направления */}
            <nav className="flex flex-col gap-3" aria-label="Популярные направления">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream">
                Направления
              </h3>
              {featured.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/strany/${dest.slug}`}
                  className="text-sm text-cream/60 transition-colors hover:text-turquoise"
                >
                  {dest.name}
                </Link>
              ))}
            </nav>

            {/* Контакты */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-cream">
                Контакты
              </h3>
              <a
                href="https://2gis.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" />
                {siteConfig.address}
              </a>
              <a
                href={contactLinks.tel}
                className="flex items-center gap-2.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <Phone className="size-4 shrink-0 text-turquoise" />
                {siteConfig.phone}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <MessageCircle className="size-4 shrink-0 text-success" />
                WhatsApp
              </a>
              <a
                href={contactLinks.mail}
                className="flex items-center gap-2.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                <Mail className="size-4 shrink-0 text-turquoise" />
                {siteConfig.email}
              </a>
              <span className="flex items-center gap-2.5 text-sm text-cream/60">
                <Clock className="size-4 shrink-0 text-turquoise" />
                {siteConfig.workingHours}
              </span>
            </div>
          </div>

          {/* Туроператоры */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/45">
              Работаем с надёжными туроператорами
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {tourOperators.map((op) => (
                <span key={op.id} className="text-sm font-semibold text-cream/70">
                  {op.name}
                </span>
              ))}
            </div>
          </div>

          {/* Оплата */}
          <div className="mt-8 flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-cream/55"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Нижняя строка */}
      <div className="border-t border-white/10">
        <div className="tt-container flex flex-col gap-3 py-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brandName}. Туристическое агентство в{" "}
            {siteConfig.city}.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/visual-qa"
              className="transition-colors hover:text-cream"
            >
              Visual QA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
