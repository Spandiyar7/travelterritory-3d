# Фото направлений

Сюда кладутся фотографии стран для карточек направлений и страниц `/strany/[slug]`.

## Имена файлов (точно)

```
turkey.jpg        uae.jpg          thailand.jpg
egypt.jpg         vietnam.jpg      maldives.jpg
sri-lanka.jpg     indonesia.jpg    qatar.jpg
georgia.jpg       europe.jpg       kazakhstan.jpg
```

## Как заменить плейсхолдеры на реальные фото

1. Положите файлы с указанными именами в эту папку (рекомендуется 1600×2000 px, JPG/WebP).
2. Откройте `src/config/site.ts` и установите `SHOW_PHOTOS = true`.
3. Готово — `next/image` подхватит фото; при отсутствии файла останется премиальный плейсхолдер.

Пути к файлам заданы в `src/data/destinations.ts` (поле `image`).
