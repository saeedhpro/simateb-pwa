<template>
  <rise-loader :loading="loading" :color="color" :size="size"></rise-loader>
</template>

<script setup lang="ts">
import RiseLoader from 'vue-spinner/src/RiseLoader.vue'

const props = defineProps({
  loading:{
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#d153fa'
  },
  size: {
    type: String,
    default: '15px'
  }
})
</script>

<style scoped lang="scss">

</style>