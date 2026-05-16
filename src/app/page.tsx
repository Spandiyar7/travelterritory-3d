import type { Metadata } from "next";
import { createMetadata, travelAgencySchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgressProvider } from "@/components/motion/ScrollProgressProvider";
import { GlobalSceneLayer } from "@/components/three/GlobalSceneLayer";
import { Hero } from "@/components/hero/Hero";
import { TourSearchSection } from "@/components/home/TourSearchSection";
import { HotToursPreview } from "@/components/home/HotToursPreview";
import { DestinationsPreview } from "@/components/home/DestinationsPreview";
import { WhyTravelTerritory } from "@/components/home/WhyTravelTerritory";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ReviewsPreview } from "@/components/home/ReviewsPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = createMetadata({
  title: "Travel Territory — туры из Алматы под ваш бюджет",
  description:
    "Подберём тур из Алматы: страна, отель, перелёт и бюджет. Реальные направления, горящие предложения и заявка в WhatsApp.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={travelAgencySchema()} />
      <ScrollProgressProvider />

      {/* Глобальная 3D-сцена путешествия — фиксированный фон под страницей */}
      <GlobalSceneLayer />

      {/* Контент скроллится поверх сцены */}
      <div className="relative z-10">
        <Hero />
        <DestinationsPreview />
        <HotToursPreview />
        <TourSearchSection />
        <WhyTravelTerritory />
        <HowItWorks />
        <ReviewsPreview />
        <FinalCTA />
      </div>
    </>
  );
}
