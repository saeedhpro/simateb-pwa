<template>
  <div class="comment-rating-item d-flex flex-column align-start justify-start">
    <div class="comment-rating-title">{{ title }}</div>
    <div class="d-flex flex-row align-center justify-space-between mt-2 full-width">
      <div class="full-width">
        <v-progress-linear color="#69D7AF" :model-value="rate * 20" :height="5"></v-progress-linear>
      </div>
      <div class="comments-rate mr-4">{{ rate }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  rate: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="scss">

</style>