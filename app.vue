<template>
  <NuxtLayout>
    <v-app>
<!--      <VitePwaManifest />-->
      <NuxtPage />
      <Pwa />
    </v-app>
  </NuxtLayout>
</template>

<script setup>

import PwaInstall from "~/components/PwaInstall.vue";

const deferredPrompt = ref(null)
const showInstallPrompt = ref(false)

onMounted(() => {
  if (process.client) {
    // ثبت Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(err => {
            console.error('Service Worker registration failed:', err);
          });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt.value = e;
      showInstallPrompt.value = true;
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
      showInstallPrompt.value = false;
    });
  }
});
</script>