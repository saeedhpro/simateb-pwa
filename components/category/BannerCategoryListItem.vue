<template>
  <nuxt-link :to="`/categories/${category.id}`" :style="{backgroundColor: category.banner}" class="d-flex flex-column align-center justify-start mx-md-1 mx-lg-0">
    <img :src="category.banner" alt="" class="w-100"/>
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