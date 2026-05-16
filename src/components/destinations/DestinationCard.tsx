import Link from "next/link";
import { ArrowUpRight, CalendarRange } from "lucide-react";
import type { Destination } from "@/types/destination";
import { DepthCard } from "@/components/motion/DepthCard";
import { DestinationImageFrame } from "@/components/frames/DestinationImageFrame";

/** Карточка направления с 3D-глубиной и фоторамкой. Ведёт на /strany/[slug]. */
export function DestinationCard({
  destination,
  priority = false,
}: {
  destination: Destination;
  priority?: boolean;
}) {
  return (
    <DepthCard className="h-full">
      <Link
        href={`/strany/${destination.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl glass-card"
      >
        <DestinationImageFrame
          destination={destination}
          priority={priority}
          className="aspect-[4/5]"
        >
          <div className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/45 text-white transition-colors duration-300 group-hover:bg-turquoise group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
            <h3 className="font-display text-xl font-extrabold text-white">
              {destination.name}
            </h3>
            <span className="flex items-center gap-1.5 text-xs text-white/80">
              <CalendarRange className="size-3.5 text-white" />
              {destination.bestSeason}
            </span>
          </div>
        </DestinationImageFrame>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-sm leading-relaxed text-cream/65">
            {destination.shortDescription}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise">
            Смотреть направление
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </DepthCard>
  );
}
