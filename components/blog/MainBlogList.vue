<template>
  <div class="main-blog-list full-width">
    <div class="main-blog-list-header d-flex flex-row align-center justify-space-between full-width py-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <div class="title pointer">
        وبلاگ
      </div>
      <nuxt-link
        to="/blog"
        class="more-link"
      >
        مشاهده بیشتر
      </nuxt-link>
    </div>
    <div class="main-blog-list-content full-width py-2 mt-6">
      <v-container :fluid="true" style="padding: 0!important;">
        <v-row>
          <v-col
              cols="12"
              v-for="(b, i) in list"
              :key="i"
              style="padding: 6px !important;"
          >
            <BlogListItem
                :blog="b"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div @click="goToPage" class="more-button mb-4">مشاهده بیشتر</div>
  </div>
</template>

<script setup lang="ts">
import BlogListItem from "~/components/blog/BlogListItem.vue";

const router = useRouter()
const {$getRequest: getRequest}=useNuxtApp()
const {data: articles} = await getRequest('/articles?type=blog&page=1&limit=4')
const list = articles ?? []
const goToPage = () => {
  router.push('/blog')
}
</script>

<style scoped lang="scss">
</style>