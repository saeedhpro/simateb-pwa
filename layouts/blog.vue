<template>
  <v-app>
    <div class="wrapper mb-8">
      <BlogHeaderComponent />
      <NuxtPage />
    </div>
    <FooterComponent />
  </v-app>
</template>
<script setup lang="ts">
import BlogHeaderComponent from "~/components/header/BlogHeaderComponent.vue";

</script>