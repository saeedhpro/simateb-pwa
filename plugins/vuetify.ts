import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        rtl: true,
        locale: {
            locale: 'fa',
        }
    })
    app.vueApp.use(vuetify)
})