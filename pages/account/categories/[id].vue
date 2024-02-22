<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-start">
    <LoadingComponent />
  </div>
  <div v-else class="profile-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <CategoryLogo :has-child="category.has_child" :logo="category.has_child ? category.logo : category.icon" />
    <div class="category-list-content py-8 px-4 full-height full-width" :class="{'has-child': category.has_child}">
      <v-container :fluid="true" v-if="category.has_child">
        <v-row>
          <v-col
              cols="4"
              sm="3"
              md="2"
              v-for="(c, i) in list"
              :key="i"
          >
            <CategoryListItem
                :category="c"
                class="mb-4 circular"
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
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: c} = await getRequest(`/categories/${id}`)
  category.value = c
  loading.value = false
  if (category.value.has_child) {
    getCategories(id)
  } else {
    getArticles(id)
  }
}
getCategory()
const list = ref([])
const getCategories = async (id: string | string[]) => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: categories} = await getRequest(`/categories/${id}/children`)
  list.value = categories
  loading.value = false
}
const articles = ref([])
const getArticles = async (id: string | string[]) => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: lst} = await getRequest(`/categories/${id}/articles`)
  articles.value = lst
  loading.value = false
}
</script>

<style scoped lang="scss">

</style>