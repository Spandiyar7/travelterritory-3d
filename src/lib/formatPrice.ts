/** Форматирует число с разделителями разрядов по русской локали. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

/** «285 000 ₸» — цена с валютой. */
export function formatPrice(value: number, currency = "₸"): string {
  return `${formatNumber(value)} ${currency}`;
}

/** «от 285 000 ₸» — для карточек туров. */
export function formatPriceFrom(value: number, currency = "₸"): string {
  return `от ${formatPrice(value, currency)}`;
}
