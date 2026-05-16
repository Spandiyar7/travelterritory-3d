export interface Review {
  id: string;
  name: string;
  /** Инициалы для аватар-заглушки */
  initials: string;
  /** Источник отзыва: 2ГИС / Instagram / Google / Yandex */
  source: string;
  rating: number;
  /** Человекочитаемая дата */
  date: string;
  text: string;
  /** Направление, по которому был тур */
  destination?: string;
  /** true => демо-отзыв, заменить на реальный из виджета */
  isDemo: boolean;
}
