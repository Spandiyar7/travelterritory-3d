import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { DestinationGrid } from "@/components/destinations/DestinationGrid";

export const metadata: Metadata = createMetadata({
  title: "Страны и направления",
  description:
    "Каталог направлений Travel Territory: Турция, ОАЭ, Таиланд, Мальдивы, Грузия и другие. Лучший сезон, курорты и ориентир по бюджету.",
  path: "/strany",
});

export default function StranyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Страны и направления"
        title={
          <>
            Куда поехать — <span className="text-gradient">выбирайте</span>{" "}
            направление
          </>
        }
        subtitle="Откройте страну, чтобы узнать лучший сезон, популярные курорты, ориентир по бюджету и оставить заявку на подбор тура."
        crumbs={[{ label: "Страны", href: "/strany" }]}
      />

      <div className="tt-container flex flex-col gap-16 py-20">
        <DestinationGrid />
        <ContactCTA
          title="Не определились с направлением?"
          text="Расскажите про бюджет и формат отдыха — менеджер подскажет, куда поехать."
        />
      </div>
    </>
  );
}
