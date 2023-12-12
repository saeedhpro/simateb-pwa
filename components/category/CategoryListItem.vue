<template>
  <nuxt-link :to="`/account/categories/${category.id}`" class="category-list-item d-flex flex-column align-center justify-start mx-2 mx-sm-2 mx-md-1 mx-lg-0">
    <div class="image-box">
      <img alt="" :src="category.icon" />
    </div>
    <div class="mt-1 text-center full-width">{{ category.title }}</div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  category: {
    type: Object,
    default: {
      id: 0,
      title: '',
      icon: '',
      has_child: false
    },
    required: true,
  }
})
</script>

<style scoped lang="scss">

</style>