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
    <div class="main-blog-list-content full-width py-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <v-row>
        <v-col
          cols="12"
          v-for="(b, i) in list"
          :key="i"
        >
          <BlogListItem
              :blog="b"
          />
        </v-col>
      </v-row>
    </div>
    <div @click="goToPage" class="more-button mb-4">مشاهده بیشتر</div>
  </div>
</template>

<script setup lang="ts">
import BlogListItem from "~/components/blog/BlogListItem.vue";

const router = useRouter()
const {data: articles} = await useFetch('/api/articles')
const list = articles.value?.data ?? []
const goToPage = () => {
  router.push('/account/blog')
}
</script>

<style scoped lang="scss">
</style>