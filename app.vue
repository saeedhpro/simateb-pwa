<template>
  <NuxtLayout>
    <v-app>
      <VitePwaManifest />
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>

const deferredPrompt = ref(null)
const showInstallPrompt = ref(false)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('before install')
    // جلوگیری از نمایش پیش‌فرض باکس نصب
    e.preventDefault()
    deferredPrompt.value = e
    // نمایش باکس نصب به کاربر
    showInstallPrompt.value = true
  })
})
</script>