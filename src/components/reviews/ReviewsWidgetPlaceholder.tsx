import { MessageSquareQuote, Star } from "lucide-react";
import { trustStats } from "@/config/site";

/** Короткий блок доверия перед отзывами. */
export function ReviewsWidgetPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-2xl glass p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
          <MessageSquareQuote className="size-5" />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-base font-extrabold text-cream">
            Туристы возвращаются с отзывами, не с претензиями
          </h3>
          <p className="text-sm leading-relaxed text-cream/60">
            Подбираем направление, отель и перелёт заранее, чтобы на отдыхе не
            выяснилось, что пляж далеко, питание слабое или район не подходит.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-lg bg-sand/15 px-2.5 py-1 font-bold text-sand">
              <Star className="size-3.5 fill-sand" />
              {trustStats.twoGisRating.toFixed(1)} в 2ГИС
            </span>
            <span className="text-cream/55">
              {trustStats.twoGisRatingsCount} оценок ·{" "}
              {trustStats.twoGisReviewsCount} отзывов ·{" "}
              {trustStats.twoGisPhotosCount} фото
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
