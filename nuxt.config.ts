import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  devtools: { enabled: true },
  css: ["@/assets/style.scss"],
  build: {
    transpile: ['vuetify'],
  },
  buildModules: [
    '@vite-pwa/nuxt',
  ],
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
  pwa: {
    meta: {
      "lang": 'fa',
      "dir": 'rtl',
      "name": "صبااپ",
      "short_name": "صبااپ",
      "start_url": ".",
      "display": "standalone",
      "background_color": "#EBF4FB",
      "mobileApp": true,
      mobileAppIOS: true,
      "icons": [
        {
          "src": "images/logo.png",
          "sizes": "48x48",
          "type": "image/png"
        },
        {
          "src": "images/logo.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "images/logo.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "images/logo.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "images/logo.png",
          "sizes": "168x168",
          "type": "image/png"
        },
        {
          "src": "images/logo.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "useWebmanifestExtension": true
    },
  },
})
