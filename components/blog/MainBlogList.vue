<template>
  <div class="main-blog-list full-width">
    <div class="main-blog-list-header d-flex flex-row align-center justify-space-between full-width py-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <div class="title pointer">
        وبلاگ
      </div>
      <nuxt-link
        to="/account/blog"
        class="more-link"
      >
        مشاهده بیشتر
      </nuxt-link>
    </div>
    <div class="main-blog-list-content d-flex flex-row align-center justify-space-between full-width py-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <v-slide-group>
        <v-slide-group-item
            v-for="(b, i) in list"
            :key="i"
            v-slot="{ isSelected, toggle }"
        >
          <BlogListItem
            :blog="b"
        />
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import BlogListItem from "~/components/blog/BlogListItem.vue";

const {data: articles} = await useFetch('/api/articles')
const list = articles.value?.data ?? []
</script>

<style scoped lang="scss">
</style>