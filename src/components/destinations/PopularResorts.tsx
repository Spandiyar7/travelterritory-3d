import { MapPin } from "lucide-react";

/** Список популярных курортов направления. */
export function PopularResorts({ resorts }: { resorts: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {resorts.map((resort) => (
        <li
          key={resort}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-cream/80"
        >
          <MapPin className="size-3.5 text-turquoise" />
          {resort}
        </li>
      ))}
    </ul>
  );
}
