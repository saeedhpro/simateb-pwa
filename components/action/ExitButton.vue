<template>
  <div @click="onClicked" class="exit-button d-flex flex-row align-center justify-center">
    <div class="title">
      خروج از حساب کاربری
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])

const onClicked = () => {
  emit('click')
}
</script>

<style scoped lang="scss">

</style>