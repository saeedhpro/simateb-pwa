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
    <div class="main-category-list-content d-flex flex-row align-center justify-space-between full-width py-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <v-slide-group>
        <v-slide-group-item
            v-for="(c, i) in list"
            :key="i"
            v-slot="{ isSelected, toggle }"
        >
          <CategoryListItem
            :category="c"
          />
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script setup lang="ts">
const {data: categories} = await useFetch('/api/categories')
const list = categories.value?.data ?? []
</script>

<style scoped lang="scss">
.main-category-list-header {
}
</style>