<template>
  <v-bottom-navigation
      :active="true"
      color="indigo"
      elevation="2"
      :grow="true"
  >
    <v-btn to="/account">
      <v-icon>mdi-home</v-icon>
      صفحه اصلی
    </v-btn>

    <v-btn to="/account/doctors">
      <v-icon>mdi-magnify</v-icon>
      پزشکان
    </v-btn>

    <v-btn to="/account/blog">
      <v-icon>mdi-note-text-outline</v-icon>
      وبلاگ
    </v-btn>

    <v-btn to="/account/profile">
      <v-icon>mdi-account</v-icon>
      پروفایل
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">

</style>