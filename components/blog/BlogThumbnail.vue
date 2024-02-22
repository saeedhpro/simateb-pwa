<template>
  <div class="blog-thumbnail">
    <img alt="" :src="thumbnail">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  thumbnail: {
    type: String,
    default: ''
  },
})
</script>

<style scoped lang="scss">

</style>