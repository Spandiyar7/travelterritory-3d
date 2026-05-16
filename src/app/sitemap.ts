import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { destinations } from "@/data/destinations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/podbor-tura", priority: 0.9, changeFrequency: "weekly" },
    { path: "/goryashchie-tury", priority: 0.9, changeFrequency: "weekly" },
    { path: "/strany", priority: 0.8, changeFrequency: "weekly" },
    { path: "/otzyvy", priority: 0.6, changeFrequency: "monthly" },
    { path: "/o-kompanii", priority: 0.6, changeFrequency: "monthly" },
    { path: "/kontakty", priority: 0.7, changeFrequency: "monthly" },
    { path: "/politika", priority: 0.2, changeFrequency: "monthly" },
  ];

  const base = staticRoutes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${siteConfig.siteUrl}/strany/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...base, ...destinationRoutes];
}
