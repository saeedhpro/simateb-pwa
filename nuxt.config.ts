import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      charset: "utf-8",
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
        {
          rel: 'icon',
          href: '/icons/icon.png',
          sizes: '192x192',
          type: 'image/png'
        },
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#4DBA87'
        }
      ]
    }
  },
  devtools: { enabled: true },
  css: ["@/assets/style.scss"],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    'dayjs-nuxt',
    "nuxt-lodash",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  dayjs: {
    locales: ['en', 'fa'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'fa',
    defaultTimezone: 'Asia/Tehran',
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    build: {
      chunkSize: 1000
    }
  },
})
