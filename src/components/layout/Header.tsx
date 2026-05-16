"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Phone, Plane } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "@/data/navigation";
import { contactLinks } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-strong shadow-[0_12px_44px_-26px_rgba(15,76,55,0.35)]"
            : "bg-transparent",
        )}
      >
        <div className="tt-container flex h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Travel Territory — на главную"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#11865d,#38a7d8)] shadow-[0_8px_22px_-10px_rgba(17,134,93,0.72)] transition-transform duration-300 group-hover:-translate-y-0.5">
              <Plane className="size-5 text-white" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-extrabold text-cream">
                Travel Territory
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-turquoise">
                Туры из Алматы
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Основная навигация"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-turquoise/10 text-turquoise"
                    : "text-cream/70 hover:text-cream",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contactLinks.tel}
              aria-label="Позвонить в Travel Territory"
              className="hidden size-10 items-center justify-center rounded-full glass text-cream/80 transition-colors hover:text-cream lg:flex"
            >
              <Phone className="size-4.5" />
            </a>
            <CTAButton
              href="/podbor-tura"
              variant="primary"
              size="sm"
              className="hidden lg:inline-flex"
            >
              Подобрать тур
            </CTAButton>
            <CTAButton
              href={whatsappUrl()}
              external
              variant="whatsapp"
              size="sm"
              className="hidden lg:inline-flex"
              aria-label="Написать в WhatsApp"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </CTAButton>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="hidden size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#10b981,#22c55e)] text-white sm:flex lg:hidden"
            >
              <MessageCircle className="size-4.5" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              className="flex size-10 items-center justify-center rounded-full glass text-cream lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
