import { Eye, Headset, ShieldCheck, TrendingDown } from "lucide-react";
import { TravelSectionTrigger } from "@/components/motion/TravelSectionTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";

const reasons = [
  {
    icon: TrendingDown,
    title: "Ловим цену, а не просто тур",
    text: "Сравниваем даты, вылеты и туроператоров, чтобы не переплатить за тот же отель.",
  },
  {
    icon: Eye,
    title: "Отсекаем слабые отели",
    text: "Объясняем, где первая линия честная, где шумно, а где реально удобно с детьми.",
  },
  {
    icon: ShieldCheck,
    title: "Бронируем через проверенных",
    text: "Работаем с надёжными туроператорами и заранее проговариваем условия поездки.",
  },
  {
    icon: Headset,
    title: "Остаёмся на связи",
    text: "До вылета, во время отдыха и после возвращения — менеджер не пропадает.",
  },
];

/** Стадия 5 — почему Travel Territory: стеклянные карточки экспертизы. */
export function WhyTravelTerritory() {
  return (
    <TravelSectionTrigger id="pochemu-my" tone="panel" className="py-20 sm:py-28">
      <div className="tt-container">
        <SectionReveal>
          <SectionTitle
            eyebrow="Почему мы"
            title={
              <>
                Подбираем так, будто{" "}
                <span className="text-gradient">летим сами</span>
              </>
            }
            subtitle="Меньше лишних обещаний, больше конкретики по цене, отелю и маршруту."
          />
        </SectionReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <SectionReveal
                key={reason.title}
                delay={Math.min(i * 0.08, 0.4)}
                className="h-full"
              >
                <div className="group flex h-full flex-col gap-3 rounded-2xl glass-card p-6 lift hover:-translate-y-1.5">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-turquoise/12 text-turquoise">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-cream">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/65">
                    {reason.text}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </TravelSectionTrigger>
  );
}
