<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="samples-page relative d-flex flex-column align-center justify-start">
    <BgGreen class="absolute top right"/>
    <BgBlue class="absolute top left"/>

    <div class="pt-8 px-4 md:px-8 full-width d-flex flex-column align-center justify-start" style="z-index: 99">
      <SampleHeroBoxImage />
      <div class="d-flex flex-column align-start justify-start full-width mt-8">
        <div
            v-for="(s, i) in list.data"
            :key="i"
            class="sample-item d-flex flex-row align-center justify-space-between mb-4"
        >
          <div class="sample-image-box d-flex flex-1 full-width full-height">
            <img :src="s.image" alt="">
          </div>
          <div class="sample-details d-flex flex-1 flex-column full-width full-height">
            <h3 class="mb-2">{{ s.title }}</h3>
            <h5 class="mb-4">{{ s.sub_title }}</h5>
            <div class="d-flex flex-row align-center justify-end">
              <nuxt-link class="sample-item-link" :to="`/account/doctors/${id}/samples/${s.id}`">مشاهده</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import SampleHeroBoxImage from "~/components/doctor/SampleHeroBoxImage.vue";
import BgBlue from "~/components/intro/BgBlue.vue";
import BgGreen from "~/components/intro/BgGreen.vue";

const router = useRouter()
const route = useRoute()
const id = route.params.id

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const step = ref(1)

const onBackClicked = () => {
  router.go(-1)
}

const list = ref({
  data: [],
})

const getDoctor = async () => {
  loading.value = true
  // const {$getRequest: getRequest}=useNuxtApp()
  // const {data: d} = await getRequest(`/doctors/${id}`)

  const {data: samples} = await useFetch('/api/samples')
  list.value.data = samples.value?.data ?? []
  loading.value = false
}
getDoctor()
</script>

<style scoped lang="scss">

</style>