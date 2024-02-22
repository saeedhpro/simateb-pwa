<template>
  <div>
    <BlogSmallItem
        class="mt-4"
        v-for="(blog, n) in articles.data"
        :blog="blog"
        :key="n"
    />
    <div v-if="loading" class="relative d-flex flex-column align-center justify-center" style="height: 100px">
      <LoadingComponent color="primary"/>
    </div>
    <div v-if="!loading && articles.meta.current_page <= articles.meta.last_page" @click="paginate(articles.meta.current_page + 1)" class="more-button my-4">مشاهده بیشتر</div>
  </div>
</template>

<script setup lang="ts">
  import BlogSmallItem from "~/components/blog/BlogSmallItem.vue";

  const emits = defineEmits(['paginate'])

  const props = defineProps({
    loading: {
      type: Boolean,
      required: true,
    },
    articles: {
      type: Object,
      default: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1
        }
      }
    }
  })

  const paginate = (page: Number) => {
    emits('paginate', page)
  }
</script>

<style scoped lang="scss">

</style>