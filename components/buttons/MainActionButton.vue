<template>
  <v-btn @click="onClick" :disabled="disabled" variant="flat" text="#fff" color="#7CA6E7" rounded :height="height" :width="width" class="mx-auto">
    {{ title }}
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String || null,
    default: ''
  },
  width: {
    type: String,
    default: '60%'
  },
  height: {
    type: String,
    default: '48px'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const onClickEmit = defineEmits(['click'])

const onClick = () => {
  onClickEmit('click')
}
</script>

<style scoped>

</style>