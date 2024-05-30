<template>
  <div class="blog-page px-4 py-4">
    <BlogTitle />
    <BlogTagListSmall
        @select="selectTag"
        @unselect="unSelectTag"
    />
    <BlogList
      :articles="articles"
      :loading="loading"
      @paginate="paginate"
    />
  </div>
</template>

<script setup lang="ts">
import {definePageMeta} from "#imports";
import BlogTitle from "~/components/blog/BlogTitle.vue";
import BlogTagListSmall from "~/components/blog/BlogTagListSmall.vue";

definePageMeta({
  layout: 'blog'
})

const tags = ref<String[]>([])

const selectTag = (tag: String) => {
  tags.value.push(tag)
  articles.value = {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1
    }
  }
  paginate(1)
}

const unSelectTag = (tag: String) => {
  tags.value = tags.value.filter(i => i !== tag)
  articles.value = {
    data: [],
    meta: {
      current_page: 1,
      last_page: 1
    }
  }
  paginate(1)
}

const router = useRouter()
const {$getRequest: getRequest}=useNuxtApp()

const loading = ref(false)
const articles = ref({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1
  }
})
const paginate = async(page = 1) => {
  loading.value = true
  const tagList = tags.value.length > 0 ? tags.value.join(',') : ''
  const list = await getRequest(`/articles?type=blog&page=${page}&limit=4&tags=${tagList}`)
  articles.value.data = [
    ...articles.value.data,
    ...list.data
  ]
  articles.value.meta = list.meta
  loading.value = false
}
paginate()
</script>

<style scoped lang="scss">

</style>