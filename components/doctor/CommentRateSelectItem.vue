<template>
  <div class="comment-rating-item d-flex flex-column align-start justify-start">
    <div class="comment-rating-title">{{ title }}</div>
    <div class="d-flex flex-row align-center justify-space-between mt-2 full-width">
      <div class="full-width">
        <v-rating
            :length="5"
            :size="20"
            :readonly="false"
            color="warning"
            @update:modelValue="onUpdate"
            :model-value="modelValue"
        />
      </div>
      <div class="comments-rate mr-4">{{ rate }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Number,
    default: 0,
  },
})

const onUpdate = (rate: number | string) => {
  emits('update:modelValue', rate)
}
</script>

<style scoped lang="scss">

</style>