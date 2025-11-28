// Imprimos talwindcss
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: "src/",
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxtjs/i18n'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ]
  },
  css: ['~/assets/css/main.css'], // CSS ahora dentro de assets/],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      title: 'AWD',
      meta: [
        { name: 'AWD', content: 'AWD Protafolio fornt-end' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }]
    }
  }
})