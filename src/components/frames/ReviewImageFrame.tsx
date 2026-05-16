import { cn } from "@/lib/cn";

type ReviewImageFrameProps = {
  initials: string;
  className?: string;
};

/** Аватар-заглушка для отзыва (инициалы на градиенте). */
export function ReviewImageFrame({ initials, className }: ReviewImageFrameProps) {
  return (
    <div
      className={cn(
        "relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl hairline",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(140deg,#11865d,#38a7d8)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_25%,rgba(255,255,255,0.35),transparent_70%)]" />
      <span className="relative font-display text-sm font-extrabold text-deep-navy">
        {initials}
      </span>
    </div>
  );
}
