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
    <div>
      <Splide :options="options" aria-label="">
        <SplideSlide v-for="(c, i) in list" :key="i">
          <MainCategoryListItem
          :category="c"
          :class="{'desktop': !onMobile}"
          />
        </SplideSlide>
        <div class="splide__arrows" />
      </Splide>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainCategoryListItem from "~/components/category/MainCategoryListItem.vue";
import {Splide, SplideSlide} from "@splidejs/vue-splide";
import '@splidejs/vue-splide/css';
const {$getRequest: getRequest}=useNuxtApp()
const {data: categories} = await getRequest('/categories?type=page&page=1&limit=6')
const list = categories ?? []
const {$isMobile: isMobile} = useNuxtApp()
const onMobile = computed(() => isMobile())
const options = ref({
  fixedWidth : '150px',
  gap        : '1rem',
  arrows: false,
  direction: "rtl"
})
</script>

<style scoped lang="scss">
.main-category-list-header {
}
</style>