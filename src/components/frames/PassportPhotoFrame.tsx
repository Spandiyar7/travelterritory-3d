import { Compass } from "lucide-react";
import { cn } from "@/lib/cn";
import { TravelGlassFrame } from "./TravelGlassFrame";

type PassportPhotoFrameProps = {
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
};

/** Фоторамка в стиле страницы паспорта — с угловым штампом. */
export function PassportPhotoFrame({
  src,
  alt,
  caption,
  className,
}: PassportPhotoFrameProps) {
  return (
    <div className={cn("relative", className)}>
      <TravelGlassFrame
        src={src}
        alt={alt}
        accent="#1d4571"
        rounded="rounded-2xl"
        className="aspect-[4/5] w-full"
        placeholder={
          <div className="flex flex-col items-center gap-2">
            <Compass className="size-9 text-sand/75" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/45">
              Travel Territory
            </span>
          </div>
        }
      />
      {/* Угловой «штамп» */}
      <div
        aria-hidden
        className="absolute -right-3 -top-3 flex size-16 rotate-[14deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-sunset/55 bg-deep-navy/70 text-center text-[0.5rem] font-bold uppercase leading-tight tracking-wider text-sunset/80"
      >
        Travel
        <br />
        Territory
      </div>
      {caption && (
        <p className="mt-3 text-center text-sm text-cream/60">{caption}</p>
      )}
    </div>
  );
}
