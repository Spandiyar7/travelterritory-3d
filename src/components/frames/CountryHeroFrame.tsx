import type { ReactNode } from "react";
import { Compass } from "lucide-react";
import type { Destination } from "@/types/destination";
import { TravelGlassFrame } from "./TravelGlassFrame";

type CountryHeroFrameProps = {
  destination: Destination;
  className?: string;
  children?: ReactNode;
};

/** Крупная фоторамка-герой для страницы направления. */
export function CountryHeroFrame({
  destination,
  className,
  children,
}: CountryHeroFrameProps) {
  return (
    <TravelGlassFrame
      src={destination.image}
      alt={`${destination.name} — направление Travel Territory`}
      accent={destination.accent}
      priority
      className={className}
      sizes="(max-width: 1024px) 100vw, 50vw"
      placeholder={
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <span className="text-7xl drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)]">
            {destination.flag}
          </span>
          <span className="font-display text-2xl font-extrabold text-cream">
            {destination.name}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/55">
            <Compass className="size-4" />
            Направление Travel Territory
          </span>
        </div>
      }
    >
      {children}
    </TravelGlassFrame>
  );
}
