<template>
  <div class="category-logo" :class="{'has-child': hasChild}">
    <img alt="" :src="logo" :style="{borderRadius: hasChild ? '50% !important': '15px'}">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  logo: {
    type: String,
    default: ''
  },
  hasChild: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">

</style>