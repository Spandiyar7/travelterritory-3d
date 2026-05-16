import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { organizationSchema } from "@/lib/seo";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const description =
  "Travel Territory подбирает туры из Алматы под ваш бюджет: страны, отели, горящие предложения и сопровождение менеджера до вылета.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Travel Territory — подбор туров и горящие туры в Алматы",
    template: "%s — Travel Territory",
  },
  description,
  applicationName: siteConfig.brandName,
  keywords: [
    "подбор тура",
    "горящие туры",
    "туры из Алматы",
    "туристическое агентство Алматы",
    "Travel Territory",
    "туры Турция Египет ОАЭ Таиланд",
    "заявка на тур",
  ],
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.brandName,
    title: "Travel Territory — подбор туров и горящие туры в Алматы",
    description,
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Territory — подбор туров и горящие туры в Алматы",
    description,
  },
  robots: { index: true, follow: true },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#f3fbf6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${montserrat.variable}`}>
      <body className="flex min-h-screen flex-col bg-deep-navy font-sans text-cream antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
