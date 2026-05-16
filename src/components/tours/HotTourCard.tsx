import { MessageCircle, Moon, PlaneTakeoff, UtensilsCrossed } from "lucide-react";
import type { HotTour } from "@/types/tour";
import { TourCard3D } from "@/components/three/TourCard3D";
import { TourImageFrame } from "@/components/frames/TourImageFrame";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { PricePulse } from "@/components/motion/PricePulse";
import { CTAButton } from "@/components/ui/CTAButton";
import { formatPrice, formatPriceFrom } from "@/lib/formatPrice";
import { hotTourWhatsappUrl } from "@/lib/whatsapp";

const badgeTone: Record<HotTour["badge"], BadgeTone> = {
  "Горящий тур": "hot",
  Выгодно: "success",
  Хит: "sand",
  Новинка: "info",
};

/** Карточка горящего тура с 3D-наклоном, фоторамкой и пульсом цены. */
export function HotTourCard({ tour }: { tour: HotTour }) {
  return (
    <TourCard3D className="h-full rounded-3xl">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl glass-card">
        <TourImageFrame tour={tour} className="aspect-[16/11]">
          <div className="absolute left-3 top-3">
            <Badge tone={badgeTone[tour.badge]} dot>
              {tour.badge}
            </Badge>
          </div>
          <div className="absolute right-3 top-3 rounded-md bg-black/55 px-2 py-1 text-xs font-bold text-white">
            {"★".repeat(tour.stars)}
          </div>
        </TourImageFrame>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="font-display text-lg font-extrabold text-cream">
              {tour.destination}, {tour.country}
            </h3>
            <p className="text-sm text-cream/55">{tour.hotel}</p>
          </div>
          <p className="text-sm leading-relaxed text-cream/65">
            {tour.description}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-cream/60">
            <li className="flex items-center gap-1.5">
              <Moon className="size-3.5 text-turquoise" />
              {tour.nights} ночей
            </li>
            <li className="flex items-center gap-1.5">
              <UtensilsCrossed className="size-3.5 text-turquoise" />
              {tour.meal}
            </li>
            <li className="flex items-center gap-1.5">
              <PlaneTakeoff className="size-3.5 text-turquoise" />
              {tour.departureCity}
            </li>
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex flex-col">
              {tour.oldPrice && (
                <span className="text-xs text-cream/40 line-through">
                  {formatPrice(tour.oldPrice, tour.currency)}
                </span>
              )}
              <PricePulse>{formatPriceFrom(tour.priceFrom, tour.currency)}</PricePulse>
            </div>
          </div>
          <CTAButton
            href={hotTourWhatsappUrl(tour)}
            external
            variant="whatsapp"
            size="sm"
            className="w-full"
          >
            <MessageCircle className="size-4" />
            Узнать цену
          </CTAButton>
        </div>
      </article>
    </TourCard3D>
  );
}
