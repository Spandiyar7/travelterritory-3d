import { BedDouble } from "lucide-react";
import { TravelGlassFrame } from "./TravelGlassFrame";

type HotelImageFrameProps = {
  name: string;
  image?: string;
  className?: string;
};

/** Фоторамка отеля с премиальным плейсхолдером. */
export function HotelImageFrame({ name, image, className }: HotelImageFrameProps) {
  return (
    <TravelGlassFrame
      src={image}
      alt={`Отель ${name}`}
      accent="#38a7d8"
      className={className}
      rounded="rounded-2xl"
      placeholder={
        <div className="flex flex-col items-center gap-2 px-3 text-center">
          <BedDouble className="size-7 text-sky" />
          <span className="text-sm font-bold text-cream">{name}</span>
        </div>
      }
    />
  );
}
