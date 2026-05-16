import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/formatPrice";
import type { HotTour, TourRequestData } from "@/types/tour";

/** Базовое сообщение для общей кнопки WhatsApp. */
export const DEFAULT_WHATSAPP_MESSAGE =
  "Здравствуйте! Хочу подобрать тур в Travel Territory.";

/** Собирает ссылку wa.me с готовым текстом. */
export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Соединяет строки сообщения, пропуская пустые поля. */
function joinLines(lines: (string | false | null | undefined)[]): string {
  return lines.filter(Boolean).join("\n");
}

/** Сообщение по конкретному горящему туру. */
export function hotTourWhatsappUrl(tour: HotTour): string {
  const message = joinLines([
    "Здравствуйте! Интересует горящий тур:",
    `Направление: ${tour.destination}, ${tour.country}`,
    `Отель: ${tour.hotel} ${"★".repeat(tour.stars)}`,
    `Ночей: ${tour.nights}`,
    `Питание: ${tour.meal}`,
    `Вылет из: ${tour.departureCity}`,
    `Цена от: ${formatPrice(tour.priceFrom, tour.currency)}`,
    "Подскажите актуальность и детали.",
  ]);
  return whatsappUrl(message);
}

/** Текст заявки на подбор тура (данные формы) — для WhatsApp и e-mail. */
export function tourRequestMessage(data: TourRequestData): string {
  return joinLines([
    "Здравствуйте! Хочу подобрать тур:",
    data.destination && `Куда: ${data.destination}`,
    data.departureCity && `Город вылета: ${data.departureCity}`,
    data.dates && `Даты: ${data.dates}`,
    data.nights && `Ночей: ${data.nights}`,
    data.adults && `Взрослые: ${data.adults}`,
    data.children && `Дети: ${data.children}`,
    data.budget && `Бюджет: ${data.budget}`,
    data.vacationType && `Тип отдыха: ${data.vacationType}`,
    data.comment && `Комментарий: ${data.comment}`,
  ]);
}

/** Ссылка WhatsApp с заявкой на подбор тура. */
export function tourRequestWhatsappUrl(data: TourRequestData): string {
  return whatsappUrl(tourRequestMessage(data));
}

/** Сообщение по конкретному направлению (страница страны). */
export function destinationWhatsappUrl(destinationName: string): string {
  return whatsappUrl(
    `Здравствуйте! Интересует тур в направлении «${destinationName}». Подскажите варианты и цены.`,
  );
}
