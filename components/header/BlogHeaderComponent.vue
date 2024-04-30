<template>
  <div class="header-component blog-header px-4 rtl d-flex flex-row align-center justify-space-between full-width">
      <v-img class="pointer" @click="goToHome" src="/images/blog-logo.png"/>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const goToHome = () => {
  router.push('/account')
}
</script>

<style scoped lang="scss">

</style>