<template>
  <div class="category-logo">
    <img alt="" :src="logo">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  logo: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">

</style>