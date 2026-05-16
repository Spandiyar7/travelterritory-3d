import { siteConfig } from "@/config/site";

/** Формирует mailto-ссылку на почту агентства. */
export function mailtoUrl(subject: string, body: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${siteConfig.email}${query ? `?${query}` : ""}`;
}

/** Письмо с заявкой на подбор тура (fallback к WhatsApp). */
export function tourRequestMailtoUrl(body: string): string {
  return mailtoUrl("Заявка на подбор тура — Travel Territory", body);
}
