import { cn } from "@/lib/cn";

/** Декоративный слой карт-маршрутов с бегущим пунктиром — фон для секций. */
export function RouteOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-40 220 C 300 80, 720 130, 1240 60"
          stroke="rgba(17,134,93,0.16)"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          className="anim-dash"
        />
        <path
          d="M-40 520 C 360 620, 760 420, 1240 540"
          stroke="rgba(96,165,250,0.13)"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          className="anim-dash"
        />
        <path
          d="M-40 380 C 280 320, 820 470, 1240 320"
          stroke="rgba(249,115,22,0.1)"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          className="anim-dash"
        />
      </svg>
    </div>
  );
}
