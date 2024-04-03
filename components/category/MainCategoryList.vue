<template>
  <div class="main-category-list full-width">
    <div class="main-category-list-header d-flex flex-row align-center justify-space-between full-width py-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <div class="title pointer">
        دسته بندی
      </div>
      <nuxt-link
        to="/account/categories"
        class="more-link"
      >
        مشاهده بیشتر
      </nuxt-link>
    </div>
    <div class="main-category-list-content d-flex flex-row align-center justify-space-between full-width py-2 mt-6 px-1 px-sm-2">
      <v-slide-group :show-arrows="!onMobile" >
        <v-slide-group-item
            v-for="(c, i) in list"
            :key="i"
            v-slot="{ isSelected, toggle }"
        >
          <MainCategoryListItem
            :category="c"
            :class="{'desktop': !onMobile}"
          />
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainCategoryListItem from "~/components/category/MainCategoryListItem.vue";

const {$getRequest: getRequest}=useNuxtApp()
const {data: categories} = await getRequest('/categories?type=page&page=1&limit=6')
const list = categories ?? []

const {$isMobile: isMobile} = useNuxtApp()
const onMobile = computed(() => isMobile())

</script>

<style scoped lang="scss">
.main-category-list-header {
}
</style>