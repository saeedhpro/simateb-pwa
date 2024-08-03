<template>
  <div class="back-button" @click="onClick">
<!--    <svg width="50" height="50" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--      <circle opacity="0.9" cx="25" cy="25" r="25" fill="white"/>-->
<!--      <path d="M15.8021 26.6534V25.4602L30.2197 16.8469V18.5373L17.5421 26.0692L17.6664 25.8455V26.2681L17.5421 26.0444L30.2197 33.5763V35.2667L15.8021 26.6534Z" fill="#968B8B"/>-->
<!--    </svg>-->
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17.5" cy="17.5" r="17.5" fill="#EEF1FF"/>
      <path d="M11.2929 16.2929C10.9024 16.6834 10.9024 17.3166 11.2929 17.7071L17.6569 24.0711C18.0474 24.4616 18.6805 24.4616 19.0711 24.0711C19.4616 23.6805 19.4616 23.0474 19.0711 22.6569L13.4142 17L19.0711 11.3431C19.4616 10.9526 19.4616 10.3195 19.0711 9.92893C18.6805 9.53841 18.0474 9.53841 17.6569 9.92893L11.2929 16.2929ZM23 16H12V18H23V16Z" fill="#84A9FE"/>
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