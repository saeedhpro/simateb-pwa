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
        {rel: 'manifest', href: '/manifest.webmanifest'}
      ]
    }
  },
  devtools: { enabled: true },
  css: ["@/assets/style.scss"],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@vite-pwa/nuxt',
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
  pwa: {
    registerWebManifestInRouteRules: true,
    registerType:'autoUpdate',
    strategies: 'generateSW',
    manifest: {
      name: 'اپ دکتر',
      short_name: 'اپ دکتر',
      description: 'نرم افزار مدیریت مطب',
      lang: 'fa',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#4DBA87',
      registerType:'autoUpdate',
      orientation:'portrait',
      icons: [
        {
          src: 'icon/icon.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: [
        '*/*.*',
        '*.*',
         '_nuxt/builds/**/*.json'
      ],
      navigateFallback: null,
    },
  }
})
