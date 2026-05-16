"use client";

import { useEffect, useRef } from "react";
import { Navigation } from "lucide-react";
import { STAGE_COUNT, STAGE_NAMES, useSceneStore } from "@/lib/scroll-store";

/**
 * HUD-индикатор путешествия: вертикальная шкала прогресса + текущая стадия.
 * Обновляется по подписке на стор — без ре-рендеров React.
 */
export function TravelHUD() {
  const railRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const render = (progress: number, stage: number) => {
      const idx = Math.min(STAGE_COUNT - 1, Math.max(0, Math.round(stage)));
      if (railRef.current)
        railRef.current.style.height = `${Math.round(progress * 100)}%`;
      if (labelRef.current) labelRef.current.textContent = STAGE_NAMES[idx];
      if (numRef.current)
        numRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(STAGE_COUNT).padStart(2, "0")}`;
    };
    const initial = useSceneStore.getState();
    render(initial.progress, initial.stage);
    return useSceneStore.subscribe((s) => render(s.progress, s.stage));
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 left-[clamp(1.15rem,4vw,2.75rem)] z-30 hidden items-center gap-3 md:flex">
      <div className="h-24 w-1 overflow-hidden rounded-full bg-turquoise/12">
        <div
          ref={railRef}
          className="w-full rounded-full bg-[linear-gradient(180deg,#11865d,#38a7d8)]"
          style={{ height: "0%" }}
        />
      </div>
      <div className="glass flex flex-col gap-0.5 rounded-xl px-3 py-2">
        <span
          ref={numRef}
          className="font-mono text-[0.62rem] font-semibold tracking-widest text-turquoise"
        >
          01 / 08
        </span>
        <span ref={labelRef} className="text-xs font-bold text-cream">
          Главная
        </span>
        <span className="flex items-center gap-1 text-[0.6rem] text-cream/45">
          <Navigation className="size-2.5" />
          маршрут путешествия
        </span>
      </div>
    </div>
  );
}
