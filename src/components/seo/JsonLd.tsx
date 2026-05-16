/** Встраивает структурированные данные Schema.org (JSON-LD) в страницу. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Данные формируются на сервере из локальных объектов — безопасно.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
