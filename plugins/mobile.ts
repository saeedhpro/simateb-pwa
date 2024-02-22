import { isMobile } from 'mobile-device-detect';

export default defineNuxtPlugin((app) => {

    app.provide('isMobile', () => isMobile)
})