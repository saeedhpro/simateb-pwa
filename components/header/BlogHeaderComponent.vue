<template>
  <div class="header-component blog-header px-4 py-4 rtl d-flex flex-row align-center justify-space-between full-width">
    <LogoIcon style="max-width: 200px; margin: 10px auto; height: 50px" @click="goToHome"/>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const goToHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">

</style>