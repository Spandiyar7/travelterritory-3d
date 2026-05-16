/** Теги-фильтры для каталога направлений. */
export type DestinationTag =
  | "beach"
  | "family"
  | "luxury"
  | "sightseeing"
  | "visa-free"
  | "winter"
  | "summer";

export interface Destination {
  id: string;
  /** ЧПУ-сегмент для /strany/[slug] */
  slug: string;
  /** Русское название направления, напр. «Турция» */
  name: string;
  /** Страна (для большинства совпадает с name) */
  country: string;
  /** Флаг-эмодзи для лёгких акцентов в UI */
  flag: string;
  /** Путь к фото в /public/destinations (placeholder, если файла нет) */
  image: string;
  shortDescription: string;
  /** Развёрнутое описание для страницы направления */
  longDescription: string;
  bestSeason: string;
  bestFor: string[];
  popularResorts: string[];
  /** Заметка по визе — всегда «уточняйте у менеджера» */
  visaNote: string;
  /** Ориентир по бюджету — демо-значение */
  budgetNote: string;
  tags: DestinationTag[];
  highlights: string[];
  /** Угол на глобусе (демо-координаты для 3D-сцены) */
  coords: { lat: number; lng: number };
  /** Акцентный цвет карточки */
  accent: string;
}
