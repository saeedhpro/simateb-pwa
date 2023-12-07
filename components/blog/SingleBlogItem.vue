<template>
  <nuxt-link :to="`/account/blog/${article.id}`" class="single-blog-item">
    <img class="article-thumbnail" :alt="article.title" :src="article.thumbnail" />
    <div class="title">{{ article?.title }}</div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object,
    default: {
      id: 0,
      title: '',
      thumbnail: ''
    }
  }
})
</script>

<style scoped lang="scss">

</style>