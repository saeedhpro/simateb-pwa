<template>
  <v-bottom-navigation
      :active="true"
      color="indigo"
      elevation="2"
      :grow="true"
  >
    <v-btn to="/">
      <v-icon>mdi-home</v-icon>
      صفحه اصلی
    </v-btn>

    <v-btn to="/doctors">
      <v-icon>mdi-magnify</v-icon>
      پزشکان
    </v-btn>

    <v-btn to="/blog">
      <v-icon>mdi-note-text-outline</v-icon>
      وبلاگ
    </v-btn>

    <v-btn @click="goToProfile">
      <v-icon>mdi-account</v-icon>
      پروفایل
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const goToProfile = () => {
  if (!!auth.user) {
    router.push('/account/profile')
  } else {
    auth.openLoginModal()
  }
}
watch(() => route.fullPath, () => {
  auth.closeLoginModal()
})
</script>

<style scoped lang="scss">

</style>