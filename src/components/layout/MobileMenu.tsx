"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems } from "@/data/navigation";
import { siteConfig, contactLinks } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { CTAButton } from "@/components/ui/CTAButton";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-deep-navy/80 backdrop-blur-sm"
          />
          <motion.aside
            className="glass-strong absolute right-0 top-0 flex h-full w-[min(86vw,370px)] flex-col overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-turquoise/10 px-6 py-5">
              <span className="font-display text-lg font-extrabold text-cream">
                Меню
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="flex size-9 items-center justify-center rounded-full glass text-cream/80"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-4 py-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-turquoise/10 text-turquoise"
                      : "text-cream/80 hover:bg-turquoise/8",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-turquoise/10 px-6 py-6">
              <CTAButton
                href="/podbor-tura"
                variant="primary"
                size="md"
                className="w-full"
              >
                Подобрать тур
              </CTAButton>
              <CTAButton
                href={whatsappUrl()}
                external
                variant="whatsapp"
                size="md"
                className="w-full"
              >
                <MessageCircle className="size-4" />
                Написать в WhatsApp
              </CTAButton>
              <a
                href={contactLinks.tel}
                className="flex items-center justify-center gap-2 py-1 text-sm font-semibold text-cream/80"
              >
                <Phone className="size-4 text-turquoise" />
                {siteConfig.phone}
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
