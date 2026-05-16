import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { siteConfig, contactLinks } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: "Политика обработки персональных данных",
  description:
    "Положение об обработке персональных данных посетителей сайта Travel Territory.",
  path: "/politika",
});

const sections = [
  {
    title: "1. Общие положения",
    text: "Настоящее положение описывает, как Travel Territory обрабатывает персональные данные посетителей сайта. Оставляя заявку или обращаясь к нам, вы соглашаетесь с условиями обработки данных, описанными ниже.",
  },
  {
    title: "2. Какие данные мы получаем",
    text: "Мы можем получать имя, номер телефона, адрес электронной почты и сведения о пожелании к туру, которые вы сами указываете в форме заявки или при обращении в WhatsApp и по электронной почте.",
  },
  {
    title: "3. Цели обработки",
    text: "Данные используются исключительно для связи с вами, подбора тура, консультации и оформления поездки. Сайт не подключает онлайн-оплату и бронирование — заявка передаётся менеджеру.",
  },
  {
    title: "4. Передача данных",
    text: "Мы не продаём и не передаём ваши данные третьим лицам для маркетинга. Данные могут передаваться туроператорам только в объёме, необходимом для оформления выбранного тура.",
  },
  {
    title: "5. Хранение и защита",
    text: "Мы храним данные не дольше, чем это необходимо для оказания услуги, и принимаем разумные меры для их защиты от несанкционированного доступа.",
  },
  {
    title: "6. Ваши права",
    text: "Вы можете запросить уточнение, изменение или удаление своих персональных данных, обратившись к нам по телефону или электронной почте, указанным на сайте.",
  },
];

export default function PolitikaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Документы"
        title="Политика обработки персональных данных"
        subtitle="Положение об обработке персональных данных посетителей сайта Travel Territory."
        crumbs={[{ label: "Политика обработки данных", href: "/politika" }]}
      />

      <div className="tt-container py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <SectionReveal>
            <div className="flex items-start gap-3 rounded-2xl border border-dashed border-white/20 glass p-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sand" />
              <p className="text-sm leading-relaxed text-cream/65">
                Это базовый шаблон положения. Перед публикацией замените его на
                официальный документ компании, согласованный с юристом и
                соответствующий законодательству Республики Казахстан.
              </p>
            </div>
          </SectionReveal>

          {sections.map((section, i) => (
            <SectionReveal key={section.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="rounded-2xl glass-card p-6">
                <h2 className="font-display text-lg font-extrabold text-cream">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {section.text}
                </p>
              </div>
            </SectionReveal>
          ))}

          <SectionReveal delay={0.2}>
            <div className="rounded-2xl glass-card p-6">
              <h2 className="font-display text-lg font-extrabold text-cream">
                7. Контакты
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                По вопросам обработки персональных данных свяжитесь с нами:
                телефон{" "}
                <a
                  href={contactLinks.tel}
                  className="font-semibold text-turquoise"
                >
                  {siteConfig.phone}
                </a>
                , e-mail{" "}
                <a
                  href={contactLinks.mail}
                  className="font-semibold text-turquoise"
                >
                  {siteConfig.email}
                </a>
                . Адрес: {siteConfig.address}.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </>
  );
}
