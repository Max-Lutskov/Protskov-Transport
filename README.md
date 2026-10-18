# Процков Буд

Сайт: доставка щебеню, піску, каменю й чорнозему та послуги спецтехніки у Вінниці.

Nuxt 4 + Vue 3 + TypeScript (strict) + Nuxt UI 4.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

## Заявки в Telegram

1. Створіть бота через @BotFather і скопіюйте токен.
2. Напишіть боту будь-що, потім відкрийте `https://api.telegram.org/bot<TOKEN>/getUpdates` і візьміть `chat.id`.
3. Скопіюйте `.env.example` у `.env` і впишіть обидва значення.

Без налаштування заявки просто виводяться в консоль сервера.

## Дані

Усі тексти, ціни, техніка й контакти лежать в `app/data/site.ts`. Значення з позначкою `MOCK` треба уточнити перед запуском.

## Продакшн

Форма заявок працює через серверний маршрут `server/api/lead.post.ts`, тому потрібен хостинг із підтримкою Nitro (Vercel, Netlify, Cloudflare), а не чисто статичний `nuxt generate`.

```bash
npm run build
npm run preview
```
