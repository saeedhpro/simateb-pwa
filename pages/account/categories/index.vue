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
      <v-container :fluid="true">
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
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import CategoryLogo from "~/components/category/CategoryLogo.vue";
const router = useRouter()
const onBackClicked = () => {
  router.go(-1)
}

const loading = ref(false)
const list = ref([])
const getCategories = async () => {
  loading.value = true
  const {data: categories} = await useFetch('/api/categories')
  list.value = categories.value?.data ?? []
  loading.value = false
}
getCategories()
</script>

<style scoped lang="scss">

</style>