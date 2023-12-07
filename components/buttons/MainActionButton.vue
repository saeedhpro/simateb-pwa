<template>
  <v-btn @click="onClick" :disabled="disabled" variant="flat" text="#fff" color="#7CA6E7" rounded height="48px" width="60%" class="mx-auto">
    {{ title }}
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String || null,
    default: ''
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