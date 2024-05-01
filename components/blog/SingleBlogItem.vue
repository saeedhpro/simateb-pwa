<template>
  <nuxt-link :to="`/account/blog/${article.id}`" class="single-blog-item">
    <img class="article-thumbnail" :alt="article.title" :src="article.thumbnail" />
    <div class="flex flex-col align-start justify-start">
      <div class="title">{{ article?.title }}</div>
      <div class="sub-title">{{ article?.sub_title }}</div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object,
    default: {
      id: 0,
      title: '',
      sub_title: '',
      thumbnail: ''
    }
  }
})
</script>

<style scoped lang="scss">

</style>