import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { HotToursGrid } from "@/components/tours/HotToursGrid";

export const metadata: Metadata = createMetadata({
  title: "Горящие туры",
  description:
    "Горящие туры от надёжных туроператоров: Турция, Египет, ОАЭ, Таиланд и другие направления. Поиск, фильтры и заявка в WhatsApp.",
  path: "/goryashchie-tury",
});

export default function GoryashchieTuryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Горящие туры"
        title={
          <>
            Горящие туры по{" "}
            <span className="text-gradient-sun">выгодным ценам</span>
          </>
        }
        subtitle="Подборка горящих предложений от надёжных туроператоров. Найдите тур по фильтрам и уточните актуальность у менеджера."
        crumbs={[{ label: "Горящие туры", href: "/goryashchie-tury" }]}
      />

      <div className="tt-container flex flex-col gap-16 py-20">
        <HotToursGrid />
        <ContactCTA
          title="Не нашли подходящий тур?"
          text="Оставьте заявку — менеджер подберёт горящий тур именно под ваши даты и бюджет."
        />
      </div>
    </>
  );
}
