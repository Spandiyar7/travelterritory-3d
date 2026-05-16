"use client";

import { useState, type ChangeEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { buttonStyles } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";
import { tourRequestMessage, tourRequestWhatsappUrl } from "@/lib/whatsapp";
import { tourRequestMailtoUrl } from "@/lib/mailto";
import type { TourRequestData } from "@/types/tour";

type FieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

const emptyForm: TourRequestData = {
  destination: "",
  departureCity: "Алматы",
  dates: "",
  nights: "",
  adults: "2",
  children: "0",
  budget: "",
  vacationType: "",
  comment: "",
};

const nights = [3, 5, 7, 9, 10, 12, 14].map((n) => ({
  value: String(n),
  label: `${n} ноч.`,
}));
const people = (max: number, from = 0) =>
  Array.from({ length: max - from + 1 }, (_, i) => ({
    value: String(from + i),
    label: String(from + i),
  }));
const budgets = [
  "до 350 000 ₸",
  "350 000 – 700 000 ₸",
  "700 000 – 1 500 000 ₸",
  "от 1 500 000 ₸",
].map((b) => ({ value: b, label: b }));
const vacationTypes = [
  "Пляжный отдых",
  "Семейный отдых",
  "Молодёжный отдых",
  "Медовый месяц",
  "Экскурсионный тур",
  "Горнолыжный тур",
  "Круиз",
  "VIP / luxury",
  "Корпоративная поездка",
].map((v) => ({ value: v, label: v }));

/**
 * Премиальная форма подбора тура. Бэкенда нет: заявка формируется
 * как сообщение WhatsApp (или письмо) со всеми выбранными параметрами.
 */
export function TourRequestForm({ embedded = false }: { embedded?: boolean }) {
  const [data, setData] = useState<TourRequestData>(emptyForm);

  const set = (key: keyof TourRequestData) => (e: FieldEvent) =>
    setData((prev) => ({ ...prev, [key]: e.target.value }));

  const waUrl = tourRequestWhatsappUrl(data);
  const mailUrl = tourRequestMailtoUrl(tourRequestMessage(data));
  const ready = data.destination.trim().length > 0;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={cn(
        "flex flex-col gap-4",
        !embedded && "glass-card rounded-3xl p-6 sm:p-8",
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Куда хотите поехать?"
          placeholder="Выберите направление"
          value={data.destination}
          onChange={set("destination")}
          options={destinations.map((d) => ({
            value: d.name,
            label: d.name,
          }))}
        />
        <Input
          label="Город вылета"
          value={data.departureCity}
          onChange={set("departureCity")}
        />
        <Input
          label="Даты"
          placeholder="например, 10–17 июля"
          value={data.dates}
          onChange={set("dates")}
        />
        <Select
          label="Количество ночей"
          placeholder="Выберите"
          value={data.nights}
          onChange={set("nights")}
          options={nights}
        />
        <Select
          label="Взрослые"
          value={data.adults}
          onChange={set("adults")}
          options={people(8, 1)}
        />
        <Select
          label="Дети"
          value={data.children}
          onChange={set("children")}
          options={people(5, 0)}
        />
        <Select
          label="Бюджет на человека"
          placeholder="Выберите бюджет"
          value={data.budget}
          onChange={set("budget")}
          options={budgets}
        />
        <Select
          label="Тип отдыха"
          placeholder="Выберите тип"
          value={data.vacationType}
          onChange={set("vacationType")}
          options={vacationTypes}
        />
      </div>
      <Textarea
        label="Комментарий"
        placeholder="Пожелания по отелю, питанию, перелёту…"
        value={data.comment}
        onChange={set("comment")}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonStyles({ variant: "whatsapp", size: "lg" }),
            "flex-1",
          )}
        >
          <MessageCircle className="size-4" />
          Получить подбор в WhatsApp
        </a>
        <a href={mailUrl} className={buttonStyles({ variant: "outline", size: "lg" })}>
          <Mail className="size-4" />
          На почту
        </a>
      </div>

      <p className="text-xs leading-relaxed text-cream/45">
        {ready
          ? "Заявка откроется в WhatsApp с вашими параметрами — менеджер пришлёт варианты."
          : "Укажите направление, чтобы заявка была точнее. "}
        Итоговую цену и наличие мест подтвердим перед бронированием.
      </p>
    </form>
  );
}
