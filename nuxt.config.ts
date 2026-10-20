// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Стилі імпортуються в app.vue, а не тут: тоді Nuxt вбудовує їх прямо в HTML (inlineStyles)
  // і браузер не чекає окремого CSS-файлу перед першим показом сторінки
  features: {
    inlineStyles: true
  },

  typescript: {
    strict: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      meta: [{ name: 'theme-color', content: '#262B2E' }],
      // Фавікони з лого (npm run favicons генерує растрові з favicon.svg)
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // Сайт робимо світлим, без перемикача теми
  ui: {
    colorMode: false,
    // Стилі лише для компонентів, які є на сайті. Без цього вбудований CSS ~230 КБ,
    // і на повільному мобільному інтернеті фото hero чекає, поки він завантажиться.
    // Модалку й шторку калькулятора підключено через Lazy, тож називаємо їх явно.
    experimental: {
      componentDetection: ['Modal', 'Drawer']
    }
  },

  // Сторінки однакові для всіх, тож збираємо їх під час білду: Cloudflare віддає готовий HTML
  // без роботи Worker (TTFB падає з ~700 мс). Заявки (/api/lead) і далі обробляє Worker.
  routeRules: {
    '/': { prerender: true },
    '/ekskavator/': { prerender: true },
    '/bobkat/': { prerender: true },
    '/pisok/': { prerender: true },
    '/shcheben/': { prerender: true },
    '/vyviz-smittia/': { prerender: true },
    '/vidsiv/': { prerender: true },
    '/chornozem/': { prerender: true },
    '/miniekskavator/': { prerender: true }
  },

  fonts: {
    defaults: {
      subsets: ['cyrillic', 'cyrillic-ext', 'latin']
    },
    // Запасні шрифти з підігнаними метриками прописані вручну в main.css:
    // автоматичні від модуля генеруються під local("sans-serif") і не діють.
    families: [
      { name: 'Unbounded', provider: 'google', weights: [500, 700, 800] },
      { name: 'Golos Text', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  site: {
    url: 'https://protskovbud.vn.ua',
    name: 'Процков Буд',
    // Сторінки пререндеряться як папка/index.html, а Cloudflare віддає їх за адресою зі слешем
    trailingSlash: true
  },

  // Заявки з сайту йдуть у Telegram. Значення задаються змінними середовища:
  // NUXT_TELEGRAM_BOT_TOKEN і NUXT_TELEGRAM_CHAT_ID (див. .env.example)
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: ''
  }
})
