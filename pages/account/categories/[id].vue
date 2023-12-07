<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-start">
    <LoadingComponent />
  </div>
  <div v-else class="profile-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <CategoryLogo logo="/images/categories/logo.png" />
    <div class="category-list-content py-8 px-4 full-height full-width">
      <v-container :fluid="true" v-if="category.has_child">
        <v-row>
          <v-col
              cols="6"
              sm="3"
              md="2"
              v-for="(c, i) in list"
              :key="i"
          >
            <CategoryListItem
                :category="c"
                class="mb-4"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container :fluid="true" v-else>
        <v-row>
          <v-col
            cols="12"
            v-for="(a,i) in articles"
            :key="i"
          >
            <BlogSingleBlogItem
              :article="a"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import CategoryLogo from "~/components/category/CategoryLogo.vue";
const router = useRouter()
const route = useRoute()
const onBackClicked = () => {
  router.go(-1)
}

const loading = ref(false)
const category = ref({
  id: 0,
  title: '',
  icon: '',
  logo: '',
  has_child: false,
})

const getCategory = async () => {
  loading.value = true
  const id = route.params.id
  const {data: categories} = await useFetch('/api/categories')
  const c = categories.value.data.find(i => i.id == id)
  if (!c) {
    await router.push(`/account/categories`)
  }
  category.value = c
  loading.value = false
  if (category.value.has_child) {
    getCategories()
  } else {
    getArticles()
  }
}
getCategory()
const list = ref([])
const getCategories = async () => {
  loading.value = true
  const {data: categories} = await useFetch('/api/categories')
  list.value = categories.value?.data ?? []
  loading.value = false
}
const articles = ref([])
const getArticles = async () => {
  loading.value = true
  const {data: blog} = await useFetch('/api/articles')
  articles.value = blog.value?.data ?? []
  loading.value = false
}
</script>

<style scoped lang="scss">

</style>