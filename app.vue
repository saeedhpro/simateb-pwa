<template>
  <NuxtLayout>
    <v-app>
<!--      <VitePwaManifest />-->
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>

const deferredPrompt = ref(null)
const showInstallPrompt = ref(false)

onMounted(() => {
  if (process.client) {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(err => {
              console.error('Service Worker registration failed:', err);
            });
      });
    }
  }
})
</script>