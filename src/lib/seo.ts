import type { Metadata } from "next";
import { siteConfig, trustStats } from "@/config/site";

type MetaInput = {
  title: string;
  description: string;
  /** Путь маршрута, начиная с «/» */
  path?: string;
  noIndex?: boolean;
};

/** Базовая фабрика метаданных для страниц. */
export function createMetadata({
  title,
  description,
  path = "/",
  noIndex,
}: MetaInput): Metadata {
  const url = path === "/" ? siteConfig.siteUrl : `${siteConfig.siteUrl}${path}`;
  return {
    // На главной — абсолютный заголовок; на остальных применяется шаблон layout.
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Schema.org TravelAgency + LocalBusiness для главной страницы. */
export function travelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    name: siteConfig.brandName,
    description: siteConfig.mainActivity,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: String(trustStats.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Муканова 241, 2 корпус, офис 7А",
      addressLocality: siteConfig.city,
      addressCountry: "KZ",
    },
    areaServed: "Казахстан",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: trustStats.twoGisRating,
      reviewCount: trustStats.twoGisReviewsCount,
      bestRating: 5,
    },
    priceRange: "₸₸",
  };
}

/** Schema.org Organization для общего layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "sales",
      areaServed: "KZ",
      availableLanguage: ["Russian", "Kazakh"],
    },
  };
}

/** Хлебные крошки в формате BreadcrumbList. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path}`,
    })),
  };
}
