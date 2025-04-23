<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-start">
    <LoadingComponent />
  </div>
  <div v-else class="profile-page relative d-flex flex-column align-center justify-start">
    <BackButton
      @click="onBackClicked"
    />
    <div class="category-list-top">
      <img src="/category.png" style="width: 100%; margin-top: 25px;"/>
    </div>
    <div class="category-list-content py-8 px-4 full-height full-width">
      <v-container :fluid="true">
        <v-row>
          <v-col
            cols="4"
            sm="4"
            md="3"
            v-for="(c, i) in list"
            :key="i"
          >
            <CategoryListItem
                :category="c"
                class="mb-4 circular"
                :class="isSmall ? 'small': ''"
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
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const router = useRouter()
const onBackClicked = () => {
  router.go(-1)
}

const loading = ref(false)
const list = ref([])
const getCategories = async () => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: categories} = await getRequest('/categories?type=page')
  list.value = categories ?? []
  loading.value = false
}
getCategories()

const isSmall = computed(() => {
  return mobile.value
})
</script>

<style scoped lang="scss">

</style>