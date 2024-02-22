<template>
  <v-progress-circular :color="color" indeterminate/>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#FFF'
  }
})
</script>
