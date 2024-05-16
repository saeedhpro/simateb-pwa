<template>
  <v-btn class="main-action-button mx-auto" @click="onClick" :disabled="disabled" variant="flat" text="#fff" :color="color" :rounded="rounded" :height="height" :width="width">
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
  color: {
    type: String,
    default: '#7CA6E7'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: String,
    default: 'sm'
  }
})
const onClickEmit = defineEmits(['click'])

const onClick = () => {
  onClickEmit('click')
}
</script>

<style scoped>

</style>