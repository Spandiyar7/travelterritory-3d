import { Clock, MapPinned, PlaneTakeoff, Wallet } from "lucide-react";
import { HeroContent } from "./HeroContent";
import { FloatingTravelCard } from "./FloatingTravelCard";

/**
 * Секция-герой — стадия 1 глобальной 3D-сцены.
 * Сама 3D-сцена рендерится фиксированным слоем под страницей (GlobalSceneLayer).
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pb-20 pt-30">
      {/* Левая «вуаль» — читаемость текста поверх 3D */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(243,251,246,0.96),rgba(243,251,246,0.72)_48%,rgba(243,251,246,0.16))]"
      />
      {/* Затухание в следующую секцию */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-deep-navy"
      />

      <div className="tt-container relative grid w-full items-center gap-10 lg:grid-cols-2">
        <HeroContent />

        {/* Парящие карточки вокруг 3D-глобуса */}
        <div className="relative hidden h-[34rem] lg:block">
          <FloatingTravelCard
            className="absolute right-2 top-4"
            icon={<PlaneTakeoff className="size-5" />}
            label="Летим из Алматы"
            sublabel="Подберём удобный вылет"
            tone="sunset"
            delay={0.3}
          />
          <FloatingTravelCard
            className="absolute left-0 top-[38%]"
            icon={<Wallet className="size-5" />}
            label="Без переплаты"
            sublabel="Сравним 70+ операторов"
            tone="turquoise"
            delay={0.5}
          />
          <FloatingTravelCard
            className="absolute right-0 bottom-24"
            icon={<Clock className="size-5" />}
            label="Ответ за 15 минут"
            sublabel="В WhatsApp или по телефону"
            tone="sky"
            delay={0.7}
          />
          <FloatingTravelCard
            className="absolute left-8 bottom-2"
            icon={<MapPinned className="size-5" />}
            label="Страна под задачу"
            sublabel="Семья, море, экзотика, VIP"
            tone="ocean"
            delay={0.9}
          />
        </div>
      </div>
    </section>
  );
}
