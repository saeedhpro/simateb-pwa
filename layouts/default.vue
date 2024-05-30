<template>
  <v-app>
    <LoadingModal v-if="loading" />
    <LoginModal/>
    <div class="wrapper mb-8">
      <NuxtPage />
    </div>
    <FooterComponent />
  </v-app>
</template>
<script setup lang="ts">
const nuxt = useNuxtApp()
const loading = ref(true)

nuxt.hook('page:start', () => {
  loading.value = true
})
nuxt.hook('page:finish', () => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>