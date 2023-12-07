<template>
  <div class="back-button" @click="onClick">
    <svg width="50" height="50" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity="0.9" cx="25" cy="25" r="25" fill="white"/>
      <path d="M15.8021 26.6534V25.4602L30.2197 16.8469V18.5373L17.5421 26.0692L17.6664 25.8455V26.2681L17.5421 26.0444L30.2197 33.5763V35.2667L15.8021 26.6534Z" fill="#968B8B"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['click'])
  const onClick = () => {
    emit('click')
  }
</script>

<style scoped lang="scss">

</style>