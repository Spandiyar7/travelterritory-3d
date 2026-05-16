# Travel Territory — 3D travel website

Премиальный скролл-управляемый 3D-сайт туристического агентства **Travel
Territory** (Алматы). Вся главная страница построена вокруг единой 3D-сцены
путешествия, которая трансформируется по мере прокрутки.

## Технологии

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
React Three Fiber + drei + three.js · Framer Motion · GSAP · Lenis · Zustand.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # продакшн-сборка
npm run start      # запуск собранного сайта
npm run lint       # ESLint
```

**Если порт 3000 занят** (например, другим процессом):

```bash
npm run dev -- -p 3001
```

(на Windows / PowerShell надёжнее: `npx next dev -p 3001`)

## Где что менять

| Что | Файл |
| --- | --- |
| Контакты, телефон, e-mail, адрес | `src/config/site.ts` |
| Номер WhatsApp | `src/config/site.ts` → поле `whatsapp` |
| Включить реальные фото | `src/config/site.ts` → `SHOW_PHOTOS = true` |
| Направления / страны | `src/data/destinations.ts` |
| Горящие туры (демо) | `src/data/hotTours.ts` |
| Отзывы (демо) | `src/data/reviews.ts` |
| Туроператоры | `src/data/tourOperators.ts` |
| Навигация | `src/data/navigation.ts` |
| FAQ | `src/data/faq.ts` |

## Фотографии

Сайт по умолчанию показывает премиальные плейсхолдеры (без «битых» картинок).
Чтобы подключить реальные фото:

1. Положите файлы в `public/destinations/`, `public/hot-tours/`,
   `public/hotels/`, `public/team/` — точные имена в `README.md` каждой папки.
2. В `src/config/site.ts` установите `SHOW_PHOTOS = true`.

## 3D-модели

Все 3D-объекты процедурные (собраны кодом, файлы не нужны). Чтобы заменить их
на реальные GLB-модели — см. `public/models/README.md`.

## Подключение реального API туров

Сейчас `src/data/hotTours.ts` содержит **демо-предложения** (помечены `isDemo`).
Замените массив `hotTours` данными из CRM / API туроператора, сохранив структуру
типа `HotTour` (`src/types/tour.ts`). Карточки и фильтры подхватят данные.

## Реальные отзывы

`src/data/reviews.ts` содержит **демо-отзывы**. Замените их виджетом реальных
отзывов (2ГИС / Google / Яндекс / Instagram) — место для виджета обозначено
компонентом `ReviewsWidgetPlaceholder`.

## Заявки

Бэкенда нет: формы (`TourRequestForm`, `ContactForm`) формируют готовое
сообщение и открывают **WhatsApp** или почтовый клиент. Онлайн-оплата и
бронирование не подключены.

## Деплой на Vercel

1. Запушьте репозиторий на GitHub.
2. На [vercel.com](https://vercel.com) → New Project → импортируйте репозиторий.
3. Vercel сам определит Next.js — нажмите Deploy. Переменные окружения не нужны.

## Визуальный QA

См. `README_VISUAL_QA.md`. Кратко: `/visual-qa` — витрина компонентов,
`/?qa=1&motion=off&scene=freeze` — замороженный режим для скриншотов.
