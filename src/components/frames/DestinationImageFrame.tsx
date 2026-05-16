import type { ReactNode } from "react";
import { Plane } from "lucide-react";
import type { Destination } from "@/types/destination";
import { TravelGlassFrame } from "./TravelGlassFrame";

type DestinationImageFrameProps = {
  destination: Destination;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
};

/** Фоторамка направления с фирменным плейсхолдером (флаг + название). */
export function DestinationImageFrame({
  destination,
  className,
  priority,
  children,
}: DestinationImageFrameProps) {
  return (
    <TravelGlassFrame
      src={destination.image}
      alt={`${destination.name} — направление от Travel Territory`}
      accent={destination.accent}
      priority={priority}
      className={className}
      placeholder={
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <span className="text-5xl drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]">
            {destination.flag}
          </span>
          <span className="font-display text-lg font-extrabold text-cream">
            {destination.name}
          </span>
          <span className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cream/55">
            <Plane className="size-3.5" />
            Travel Territory
          </span>
        </div>
      }
    >
      {children}
    </TravelGlassFrame>
  );
}
