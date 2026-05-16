"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SHOW_PHOTOS } from "@/config/site";

type TravelGlassFrameProps = {
  src?: string;
  alt: string;
  /** Акцентный цвет градиента-плейсхолдера */
  accent?: string;
  className?: string;
  rounded?: string;
  /** Контент плейсхолдера (иконка / подпись), когда фото нет */
  placeholder?: ReactNode;
  /** Оверлей поверх фото (бейджи, подписи) */
  children?: ReactNode;
  priority?: boolean;
  sizes?: string;
};

/**
 * Базовая стеклянная фоторамка.
 * Без фото показывает премиальный плейсхолдер (градиент + карта-сетка + маршрут).
 * С фото (SHOW_PHOTOS=true) — next/image с откатом к плейсхолдеру при ошибке.
 */
export function TravelGlassFrame({
  src,
  alt,
  accent = "#1098ad",
  className,
  rounded = "rounded-3xl",
  placeholder,
  children,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: TravelGlassFrameProps) {
  const [failed, setFailed] = useState(false);
  const showImage = SHOW_PHOTOS && Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden hairline",
        rounded,
        className,
      )}
    >
      {/* Премиальный плейсхолдер — всегда под фото */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(150deg, ${accent}30, #e9f7ef 58%, #f3fbf6)`,
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(58%_58%_at_28%_18%,rgba(255,255,255,0.16),transparent_72%)]" />
      <svg
        className="absolute inset-x-0 bottom-0 h-2/3 w-full opacity-60"
        viewBox="0 0 400 200"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M-10 170 C 120 90, 230 90, 410 30"
          stroke={accent}
          strokeWidth="2"
          strokeDasharray="3 8"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {!showImage && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center">
          {placeholder}
        </div>
      )}

      {showImage && src && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
      )}

      {/* Верхний блик и нижнее затемнение */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_34%,transparent_58%,rgba(0,0,0,0.58))]" />

      {children}
    </div>
  );
}
