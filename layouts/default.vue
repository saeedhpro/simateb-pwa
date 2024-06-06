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
const route = useRoute()
nuxt.hook('page:start', () => {
  loading.value = true
})
nuxt.hook('page:finish', () => {
  setTimeout(() => {
    loading.value = false
  }, route.path == '/' ? 2000 : 1000)
})
</script>