<template>
  <nuxt-link :to="`/account/blog/${blog.id}`" class="blog-small-item d-flex flex-row justify-start align-start">
    <div class="image-box flex-1">
      <img alt="" :src="blog.thumbnail" />
    </div>
    <div class="mr-3 pt-4 flex-3 text-right full-width blog-content-list d-flex flex-column justify-start align-start" style="height: 50px !important;">
      <div class="title">
        {{ blog.title }}
      </div>
      <div class="d-flex flex-row align-center justify-space-between full-width">
        <div class="created-at-fa">{{ blog.created_at_fa }}</div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  blog: {
    type: Object,
    default: {
      id: 0,
      title: '',
      thumbnail: '',
      created_at_fa: '',
    },
    required: true,
  }
})

</script>

<style scoped lang="scss">

</style>