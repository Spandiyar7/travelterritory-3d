import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { RouteOverlay } from "@/components/motion/RouteOverlay";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig, contactLinks, paymentMethods } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Контакты",
  description:
    "Контакты Travel Territory в Алматы: адрес, телефон, WhatsApp и e-mail. Оставьте заявку на подбор тура.",
  path: "/kontakty",
});

const contacts = [
  {
    icon: Phone,
    label: "Телефон",
    value: siteConfig.phone,
    href: contactLinks.tel,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    href: whatsappUrl(),
    external: true,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: siteConfig.email,
    href: contactLinks.mail,
  },
  {
    icon: Clock,
    label: "Часы работы",
    value: siteConfig.workingHours,
  },
];

export default function KontaktyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title={
          <>
            Свяжитесь с <span className="text-gradient">Travel Territory</span>
          </>
        }
        subtitle="Туристическое агентство в Алматы. Звоните, пишите в WhatsApp или оставьте заявку — менеджер подберёт тур."
        crumbs={[{ label: "Контакты", href: "/kontakty" }]}
      />

      <div className="tt-container flex flex-col gap-16 py-20">
        <section className="grid gap-8 lg:grid-cols-2">
          <SectionReveal className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-2xl glass-card p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cream/45">
                  Адрес офиса
                </p>
                <p className="mt-1 text-sm text-cream/85">{siteConfig.address}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((contact) => {
                const Icon = contact.icon;
                const inner = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-turquoise/15 text-turquoise">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-cream/45">
                        {contact.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-cream/85">
                        {contact.value}
                      </p>
                    </div>
                  </>
                );
                return contact.href ? (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-2xl glass-card p-5 transition-colors hover:border-white/25"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={contact.label}
                    className="flex items-center gap-3 rounded-2xl glass-card p-5"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          {/* Карта-плейсхолдер */}
          <SectionReveal delay={0.12}>
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-3xl glass-card bg-grid">
              <RouteOverlay className="opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="relative flex size-14 items-center justify-center">
                  <span className="absolute inline-flex size-full rounded-full bg-sunset/40 anim-pulse-glow" />
                  <span className="relative flex size-12 items-center justify-center rounded-full bg-sunset text-white">
                    <MapPin className="size-6" />
                  </span>
                </span>
                <p className="font-display text-lg font-extrabold text-cream">
                  Офис в Алматы
                </p>
                <p className="max-w-xs text-sm text-cream/60">
                  {siteConfig.address}
                </p>
                <a
                  href="https://2gis.kz/almaty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise"
                >
                  <Navigation className="size-4" />
                  Открыть в 2ГИС
                </a>
                <span className="mt-1 text-xs text-cream/40">
                  Интерактивная карта подключается отдельно
                </span>
              </div>
            </div>
          </SectionReveal>
        </section>

        <section className="flex flex-col gap-7">
          <SectionReveal>
            <SectionTitle
              align="left"
              eyebrow="Заявка"
              title="Оставьте заявку на подбор тура"
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <ContactForm />
          </SectionReveal>
        </section>

        <SectionReveal>
          <div className="flex flex-col gap-3 rounded-2xl glass p-6">
            <p className="text-sm font-semibold text-cream/80">
              Способы оплаты
            </p>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-cream/60"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </>
  );
}
