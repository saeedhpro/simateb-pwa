<template>
  <nuxt-link
    :to="link"
    class="profile-link"
  >
    <img alt="" :src="icon">
    <div class="title">
      {{ title }}
    </div>
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.137873 9.32955V7.625L13.8595 0.636363V3.36364L3.3339 8.43466L3.41912 8.2642V8.69034L3.3339 8.51989L13.8595 13.5909V16.3182L0.137873 9.32955Z" fill="#605D5D"/>
    </svg>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
})
</script>

<style scoped lang="scss">

</style>