<template>
  <v-app>
    <LoginModal/>
    <div class="wrapper mb-12">
      <BlogHeaderComponent />
      <NuxtPage />
    </div>
    <FooterComponent />
  </v-app>
</template>
<script setup lang="ts">
import BlogHeaderComponent from "~/components/header/BlogHeaderComponent.vue";
const nuxt = useNuxtApp()
// const loading = ref(true)
// nuxt.hook('page:start', () => {
//   loading.value = true
// })
// nuxt.hook('page:finish', () => {
//   setTimeout(() => {
//     loading.value = false
//   }, 1000)
// })

</script>