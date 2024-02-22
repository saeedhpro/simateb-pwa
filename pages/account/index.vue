<template>
  <div class="account-page">
    <HeaderComponent />
    <SearchBox class="mt-6" />
    <SliderMainSlider class="mt-6" />
    <CategoryMainCategoryList class="mt-6" />
    <DoctorMainDoctorList class="mt-6" />
    <MainBlogList class="mt-6" />
  </div>
</template>

<script setup lang="ts">
import MainBlogList from "~/components/blog/MainBlogList.vue";
import {definePageMeta} from "#imports";

const router = useRouter()

definePageMeta({
  middleware: 'auth'
})

</script>
<style scoped>

</style>