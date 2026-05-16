import { MessageCircle, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { AnimatedRouteLine } from "@/components/motion/AnimatedRouteLine";
import { whatsappUrl } from "@/lib/whatsapp";

type ContactCTAProps = {
  title?: string;
  text?: string;
};

/** Переиспользуемый финальный призыв к действию для внутренних страниц. */
export function ContactCTA({
  title = "Готовы спланировать путешествие?",
  text = "Оставьте заявку — менеджер подберёт тур, отель и цену под ваш бюджет и даты.",
}: ContactCTAProps) {
  return (
    <SectionReveal>
      <div className="relative overflow-hidden rounded-3xl glass-card p-8 text-center sm:p-12">
        <div aria-hidden className="absolute inset-0 bg-aurora opacity-70" />
        <AnimatedRouteLine
          variant="wave"
          className="absolute inset-x-0 top-0 opacity-45"
        />
        <div className="relative flex flex-col items-center gap-4">
          <h2 className="font-display text-2xl font-extrabold text-cream sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-xl text-pretty text-cream/65">{text}</p>
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <CTAButton href="/podbor-tura" variant="primary" size="lg">
              <Sparkles className="size-4" />
              Подобрать тур
            </CTAButton>
            <CTAButton
              href={whatsappUrl()}
              external
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle className="size-4" />
              Написать в WhatsApp
            </CTAButton>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
