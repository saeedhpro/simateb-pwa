<template>
  <div class="account-page">
    <HeaderComponent />
    <SearchBox :time="1000" @search="doSearch"  class="mt-2" />
    <SliderMainSlider class="mt-6" />
    <CategoryMainCategoryList class="mt-6" />
    <DoctorMainDoctorList class="mt-6" />
    <MainBlogList class="mt-6" />
  </div>
</template>

<script setup lang="ts">
import MainBlogList from "~/components/blog/MainBlogList.vue";

const router = useRouter()
const auth = useAuthStore()

const doSearch = (term: string) => {
  let query = {
    term: term
  }
  const dC = useCookie('profession_id')
  const own_id = useCookie('own_id')
  if (dC.value && own_id.value) {
    query = {
      ...query,
      profession_id: dC.value,
      own: own_id.value,
    }
  }
  auth.searchTerm = term
  router.push({
    path: '/doctors',
    query: query
  })
}

</script>
<style scoped>

</style>