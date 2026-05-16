/**
 * Единый источник контактов и бренд-данных.
 * Любые контакты на сайте берутся ОТСЮДА — не хардкодить номера в компонентах.
 */
export const siteConfig = {
  brandName: "Travel Territory",
  legalName: "Travel Territory",
  city: "Алматы",
  address: "г. Алматы, ЖК Театральный, ул. Муканова 241, 2 корпус, офис 7А",
  phone: "+7 (747) 184-50-00",
  whatsapp: "77471845000",
  email: "travelterritoryala@mail.ru",
  siteUrl: "https://travelterritory.kz",
  instagram: "",
  workingHours: "Уточняйте по телефону",
  mainActivity:
    "Подбор туров, горящие туры, страны, отели, визы, страховка и сопровождение путешествий",
} as const;

/** Готовые href для ссылок-контактов. */
export const contactLinks = {
  tel: `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`,
  mail: `mailto:${siteConfig.email}`,
  whatsapp: `https://wa.me/${siteConfig.whatsapp}`,
} as const;

/** Внешние сигналы доверия (источник — карточка 2ГИС агентства). */
export const trustStats = {
  foundedYear: 2023,
  tourOperators: "70+",
  twoGisRating: 5.0,
  twoGisRatingsCount: 405,
  twoGisReviewsCount: 368,
  twoGisPhotosCount: 793,
} as const;

/** Способы оплаты — выводятся в подвале и на странице контактов. */
export const paymentMethods = [
  "Оплата картой",
  "Оплата онлайн",
  "Оплата наличными",
  "Банковский перевод",
  "QR-оплата",
  "Рассрочка / Kaspi Red",
] as const;

/**
 * Показывать реальные фотографии через next/image.
 * По умолчанию false — сайт рендерит премиальные плейсхолдеры без «битых» картинок.
 * Поставьте true, когда добавите файлы в /public/destinations, /public/hot-tours и т.д.
 */
export const SHOW_PHOTOS = true;

export type SiteConfig = typeof siteConfig;
