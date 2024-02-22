<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-start">
    <LoadingComponent />
  </div>
  <div v-else class="profile-page blog-single-page relative d-flex flex-column align-center justify-start">
    <BlogThumbnail :thumbnail="article.thumbnail" />
    <div class="blog-content-box py-8 px-4 px-sm-8 px-md-16 full-height full-width">
      <div class="blog-title-box d-flex flex-row flex-wrap align-center justify-space-between">
        <h1 class="blog-title mb-4 text-right">{{ article.title }}</h1>
        <h3 class="blog-sub-title mb-4 text-right">{{ article.sub_title }}</h3>
        <div class="blog-details mb-4 d-flex flex-row flex-wrap align-center justify-start">
          <span class="ml-8">
            {{ article.created_at_fa }}
          </span>
          <span>
            مطالعه
            {{ article.period }}
            دقیقه
          </span>
        </div>
      </div>
      <div class="blog-content" v-html="article.body">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from "~/components/action/BackButton.vue";
import BlogThumbnail from "~/components/blog/BlogThumbnail.vue";
import {definePageMeta} from "#imports";
definePageMeta({
  layout: 'blog'
})

const router = useRouter()
const route = useRoute()
const {$getRequest: getRequest}=useNuxtApp()

const loading = ref(true)

const article = ref(null)
const id = route.params.id

const onBackClicked = () => {
  router.go(-1)
}

const getCategoriesName = (categories: []) => {
  return categories.map(i => i.name).join(' , ')
}

const {data: a} = await getRequest(`/articles/${id}`)
article.value = a ?? null
if (!article.value) {
  onBackClicked()
}
loading.value = false

</script>

<style scoped lang="scss">
.blog-title {
  color: #0A1E88;
  font-size: 1.3rem;
  line-height: 1.8rem;
  letter-spacing: 0;
  text-align: right;
  font-weight: 800;
}
.blog-sub-title {
  color: #8090E4;
  font-size: 1rem;
  line-height: 1.6rem;
  letter-spacing: 0;
  text-align: right;
  font-weight: 500;
}
.blog-details span {
  font-size: .785rem;
  font-weight: 400;
  line-height: 1.8rem;
  letter-spacing: 0;
  text-align: right;
}
</style>