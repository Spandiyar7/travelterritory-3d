export interface TourOperator {
  id: string;
  name: string;
  note: string;
}

/** Туроператоры-партнёры. Travel Territory работает с надёжными операторами. */
export const tourOperators: TourOperator[] = [
  { id: "tez", name: "TEZ Tour", note: "Массовые пляжные направления" },
  { id: "tui", name: "TUI", note: "Международный туроператор" },
  { id: "pegas", name: "Pegas Touristik", note: "Широкая полётная программа" },
  { id: "russian-express", name: "Russian Express", note: "Индивидуальные туры" },
  { id: "pac", name: "PAC Group", note: "Экскурсионные программы" },
  { id: "anex", name: "Anex", note: "Популярные курорты" },
];
