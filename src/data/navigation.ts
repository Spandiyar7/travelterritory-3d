/** Все внутренние маршруты приложения (типобезопасные href для <Link>). */
export type AppRoute =
  | "/"
  | "/podbor-tura"
  | "/goryashchie-tury"
  | "/strany"
  | "/otzyvy"
  | "/o-kompanii"
  | "/kontakty"
  | "/visual-qa"
  | "/politika";

export interface NavItem {
  label: string;
  href: AppRoute;
}

/** Главное меню — совпадает со структурой текущего сайта Travel Territory. */
export const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Подбор", href: "/podbor-tura" },
  { label: "Туры", href: "/goryashchie-tury" },
  { label: "Страны", href: "/strany" },
  { label: "Отзывы", href: "/otzyvy" },
  { label: "О нас", href: "/o-kompanii" },
  { label: "Контакты", href: "/kontakty" },
];

/** Юридические ссылки для подвала. */
export const legalLinks: NavItem[] = [
  { label: "Политика обработки персональных данных", href: "/politika" },
];
