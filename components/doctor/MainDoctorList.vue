<template>
  <div class="main-doctor-list full-width">
    <div class="main-doctor-list-header d-flex flex-row align-center justify-space-between full-width pb-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <div class="title pointer">
        معرفی پزشکان
      </div>
      <nuxt-link
        to="/doctors"
        class="more-link"
      >
        مشاهده بیشتر
      </nuxt-link>
    </div>
    <div>
      <Splide :options="options" aria-label="">
        <SplideSlide v-for="(d, i) in list" :key="i">
          <DoctorListItem
              :doctor="d"
              :class="{'desktop': !onMobile}"
          />
        </SplideSlide>
        <div class="splide__arrows" />
      </Splide>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Splide, SplideSlide} from "@splidejs/vue-splide";
import '@splidejs/vue-splide/css';
const {$getRequest: getRequest}=useNuxtApp()
const dC = useCookie('profession_id')
const own_id = useCookie('own_id')
let url = '/doctors?page=1&limit=6'
if (dC.value && own_id.value) {
  url = `${url}&profession_id=${dC.value}&own=${own_id.value}`
}
const {data: doctors} = await getRequest(url)
const list = doctors ?? []
const {$isMobile: isMobile} = useNuxtApp()
const onMobile = computed(() => isMobile())
const options = ref({
  fixedWidth : '270px',
  gap        : '1rem',
  arrows: false,
  direction: "rtl"
})
</script>

<style scoped lang="scss">
</style>