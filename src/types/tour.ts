export type TourBadge = "Горящий тур" | "Выгодно" | "Хит" | "Новинка";

export type VacationType =
  | "Пляжный отдых"
  | "Семейный отдых"
  | "Молодёжный отдых"
  | "Медовый месяц"
  | "Экскурсионный тур"
  | "Горнолыжный тур"
  | "Круиз"
  | "VIP / luxury"
  | "Корпоративная поездка";

export interface HotTour {
  id: string;
  slug: string;
  /** Курорт / город назначения */
  destination: string;
  country: string;
  hotel: string;
  /** Звёздность отеля */
  stars: number;
  image: string;
  nights: number;
  meal: string;
  departureCity: string;
  priceFrom: number;
  oldPrice?: number;
  currency: string;
  badge: TourBadge;
  tourType: VacationType;
  tags: string[];
  /** true => карточка демонстрационная, цену подтверждает менеджер */
  isDemo: boolean;
  description: string;
}

/** Данные формы подбора тура (используются для генерации сообщения WhatsApp). */
export interface TourRequestData {
  destination: string;
  departureCity: string;
  dates: string;
  nights: string;
  adults: string;
  children: string;
  budget: string;
  vacationType: string;
  comment: string;
}
