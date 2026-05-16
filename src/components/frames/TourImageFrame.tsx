import type { ReactNode } from "react";
import { Palmtree } from "lucide-react";
import type { HotTour } from "@/types/tour";
import { destinations } from "@/data/destinations";
import { TravelGlassFrame } from "./TravelGlassFrame";

type TourImageFrameProps = {
  tour: HotTour;
  className?: string;
  children?: ReactNode;
};

/** Фоторамка для карточки горящего тура. */
export function TourImageFrame({ tour, className, children }: TourImageFrameProps) {
  const accent =
    destinations.find((d) => d.name === tour.country)?.accent ?? "#1098ad";

  return (
    <TravelGlassFrame
      src={tour.image}
      alt={`${tour.hotel}, ${tour.destination} — горящий тур`}
      accent={accent}
      className={className}
      placeholder={
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <Palmtree className="size-9 text-turquoise" />
          <span className="font-display text-base font-extrabold text-cream">
            {tour.destination}
          </span>
          <span className="text-xs font-medium text-cream/55">
            {tour.country}
          </span>
        </div>
      }
    >
      {children}
    </TravelGlassFrame>
  );
}
