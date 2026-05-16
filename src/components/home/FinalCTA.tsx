import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AnimatedRouteLine } from "@/components/motion/AnimatedRouteLine";
import { CTAButton } from "@/components/ui/CTAButton";
import { siteConfig, contactLinks } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

/** Стадия 8 — финальный CTA: маршрут завершается чёткой заявкой. */
export function FinalCTA() {
  return (
    <TravelSectionTrigger id="zayavka" tone="veil" className="py-20 sm:py-28">
      <div className="tt-container">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-card p-8 text-center sm:p-14">
            <div aria-hidden className="absolute inset-0 bg-aurora opacity-80" />
            <AnimatedRouteLine
              variant="wave"
              className="absolute inset-x-0 top-0 opacity-50"
            />
            <div className="relative flex flex-col items-center gap-5">
              <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-turquoise">
                <Sparkles className="size-3.5" />
                Готовы выбрать тур?
              </span>
              <h2 className="font-display text-3xl font-extrabold text-cream sm:text-5xl">
                Напишите бюджет — покажем лучшие варианты
              </h2>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg">
                Подберём направление, отель и вылет из Алматы. Без длинных
                переписок и непонятных цен.
              </p>
              <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                <CTAButton href="/podbor-tura" variant="primary" size="lg">
                  <Sparkles className="size-4" />
                  Получить подборку
                </CTAButton>
                <CTAButton
                  href={whatsappUrl()}
                  external
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="size-4" />
                  Написать менеджеру
                </CTAButton>
              </div>
              <a
                href={contactLinks.tel}
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-cream/70 transition-colors hover:text-cream"
              >
                <Phone className="size-4 text-turquoise" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </TravelSectionTrigger>
  );
}
