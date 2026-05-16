import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages && basePath ? basePath : undefined,
  assetPrefix: isGithubPages && basePath ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  // Корень Turbopack — папка проекта (исключаем влияние внешних lock-файлов).
  turbopack: { root: import.meta.dirname },
  images: {
    // Все изображения локальные (папка /public). Удалённые источники не используются.
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"],
  },
  ...(isGithubPages
    ? {}
    : {
        async redirects() {
          // Англоязычные псевдо-URL ведут на основные русские маршруты (SEO-safe 308).
          return [
            {
              source: "/tour-selection",
              destination: "/podbor-tura",
              permanent: true,
            },
            {
              source: "/hot-tours",
              destination: "/goryashchie-tury",
              permanent: true,
            },
            { source: "/countries", destination: "/strany", permanent: true },
            { source: "/about", destination: "/o-kompanii", permanent: true },
            { source: "/contacts", destination: "/kontakty", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
