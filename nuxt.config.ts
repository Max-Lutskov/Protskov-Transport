// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      meta: [{ name: 'theme-color', content: '#262B2E' }]
    }
  },

  // Сайт робимо світлим, без перемикача теми
  ui: {
    colorMode: false
  },

  fonts: {
    defaults: {
      subsets: ['cyrillic', 'cyrillic-ext', 'latin']
    },
    families: [
      { name: 'Unbounded', provider: 'google', weights: [500, 700, 800] },
      { name: 'Golos Text', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  site: {
    url: 'https://protskovbud.vn.ua',
    name: 'Процков Буд'
  },

  // Заявки з сайту йдуть у Telegram. Значення задаються змінними середовища:
  // NUXT_TELEGRAM_BOT_TOKEN і NUXT_TELEGRAM_CHAT_ID (див. .env.example)
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: ''
  }
})
