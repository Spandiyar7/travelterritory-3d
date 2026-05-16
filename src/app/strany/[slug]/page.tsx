import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  destinations,
  getDestinationBySlug,
  getRelatedDestinations,
} from "@/data/destinations";
import { DestinationDetail } from "@/components/destinations/DestinationDetail";
import { createMetadata } from "@/lib/seo";

/** Все страницы направлений генерируются статически на этапе сборки. */
export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    return createMetadata({
      title: "Направление не найдено",
      description: "Страница направления не найдена.",
      path: "/strany",
      noIndex: true,
    });
  }
  return createMetadata({
    title: `Туры в ${destination.name}`,
    description: destination.shortDescription,
    path: `/strany/${slug}`,
  });
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const related = getRelatedDestinations(slug, 3);
  return <DestinationDetail destination={destination} related={related} />;
}
