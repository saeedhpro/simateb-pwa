<template>
  <div v-if="loading"></div>
  <Splide :options="options" aria-label="" v-else>
    <SplideSlide v-for="(s, i) in slides" :key="i">
      <img alt="" class="main-slider-img"  :src="s.image" @click="goTo(s.link)"/>
    </SplideSlide>
  </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

const options = ref({
  direction: "rtl",
  type: 'loop',
  autoplay: true,
  loop: true,
  interval: 2000,
  speed: 500,
})

const slides = ref([])
const loading = ref<Boolean>(true)

const getMainSliders = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: banners} = await getRequest('/banners')
  slides.value = banners
  loading.value = false
}

const goTo = (link: string | null) => {
  if (link) {
    window.location.href = link
  }
}

getMainSliders()
</script>

<style scoped lang="scss">
.main-slider-img {
  width: 100%;
}
</style>