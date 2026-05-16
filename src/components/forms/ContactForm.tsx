"use client";

import { useState, type ChangeEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { buttonStyles } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/whatsapp";
import { mailtoUrl } from "@/lib/mailto";

type FieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

/** Форма обратной связи. Без бэкенда — заявка уходит в WhatsApp или на почту. */
export function ContactForm() {
  const [data, setData] = useState({ name: "", phone: "", message: "" });

  const set = (key: keyof typeof data) => (e: FieldEvent) =>
    setData((prev) => ({ ...prev, [key]: e.target.value }));

  const text = [
    "Здравствуйте! Заявка с сайта Travel Territory:",
    data.name && `Имя: ${data.name}`,
    data.phone && `Телефон: ${data.phone}`,
    data.message && `Сообщение: ${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="glass-card flex flex-col gap-4 rounded-3xl p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Ваше имя"
          placeholder="Как к вам обращаться"
          value={data.name}
          onChange={set("name")}
        />
        <Input
          label="Телефон"
          type="tel"
          placeholder="+7 ___ ___ __ __"
          value={data.phone}
          onChange={set("phone")}
        />
      </div>
      <Textarea
        label="Сообщение"
        placeholder="Куда хотите поехать, на какие даты, бюджет…"
        value={data.message}
        onChange={set("message")}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl(text)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonStyles({ variant: "whatsapp", size: "lg" }),
            "flex-1",
          )}
        >
          <MessageCircle className="size-4" />
          Отправить в WhatsApp
        </a>
        <a
          href={mailtoUrl("Заявка с сайта Travel Territory", text)}
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          <Mail className="size-4" />
          На почту
        </a>
      </div>
      <p className="text-xs text-cream/45">
        Форма не использует бэкенд: заявка открывается готовым сообщением в
        WhatsApp или почтовом клиенте.
      </p>
    </form>
  );
}
