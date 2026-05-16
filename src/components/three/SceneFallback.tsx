/**
 * Премиальная не-WebGL заглушка сцены.
 * Показывается во время загрузки 3D-чанка и при отсутствии WebGL.
 */
export function SceneFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative aspect-square w-[min(82vw,540px)]">
        {/* Внешнее свечение */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(17,134,93,0.2),transparent_66%)] blur-2xl" />

        {/* Орбитальное кольцо */}
        <div className="absolute inset-[3%] rounded-full border border-turquoise/25 anim-spin-slow" />

        {/* Тело планеты */}
        <div className="absolute inset-[13%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_28%,#e8fff6,#b8ebe0_56%,#7fcfbd)] shadow-[inset_0_0_48px_rgba(17,134,93,0.22),0_0_70px_-28px_rgba(16,152,173,0.52)]">
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(circle,black_52%,transparent_74%)]" />
        </div>

        {/* Маршруты */}
        <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none">
          <path
            d="M22 64 C 40 30, 64 30, 80 40"
            stroke="#11865d"
            strokeWidth="0.7"
            strokeDasharray="1.5 2.5"
            strokeLinecap="round"
          />
          <path
            d="M26 70 C 48 78, 64 60, 78 66"
            stroke="#f97316"
            strokeWidth="0.7"
            strokeDasharray="1.5 2.5"
            strokeLinecap="round"
          />
          <circle cx="22" cy="64" r="1.6" fill="#11865d" />
          <circle cx="80" cy="40" r="1.8" fill="#38a7d8" />
          <circle cx="78" cy="66" r="1.8" fill="#f97316" />
        </svg>
      </div>
    </div>
  );
}
