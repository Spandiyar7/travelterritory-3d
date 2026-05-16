import { Star } from "lucide-react";
import type { Review } from "@/types/review";
import { ReviewPostcardFrame } from "@/components/frames/ReviewPostcardFrame";
import { ReviewImageFrame } from "@/components/frames/ReviewImageFrame";

/** Карточка отзыва в стиле дорожной открытки. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <ReviewPostcardFrame className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3">
          <ReviewImageFrame initials={review.initials} />
          <div className="min-w-0">
            <p className="font-display font-extrabold text-cream">
              {review.name}
            </p>
            <p className="truncate text-xs text-cream/50">
              {review.source} · {review.date}
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-0.5" aria-label={`Оценка ${review.rating} из 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < review.rating
                  ? "size-4 fill-sand text-sand"
                  : "size-4 text-white/15"
              }
            />
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-cream/75">
          «{review.text}»
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 pt-1">
          {review.destination && (
            <span className="text-xs text-cream/50">
              Направление: {review.destination}
            </span>
          )}
        </div>
      </div>
    </ReviewPostcardFrame>
  );
}
