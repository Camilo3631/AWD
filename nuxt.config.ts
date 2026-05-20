// Imprimimos tailwindcss
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: "src/",

  ssr: false,

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxtjs/i18n'
  ],

  i18n: {
    strategy: 'prefix',
    locales: [
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ]
  },



  css: ['~/assets/css/main.css'],


  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      title: 'AWD',

      htmlAttrs: {
        lang: 'es'
      },

      meta: [
        { name: 'description', content: 'Portafolio front-end de AWD, mostrando proyectos y habilidades.' }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
      ]
    }
  }
})