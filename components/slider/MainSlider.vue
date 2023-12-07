<template>
  <Splide class="ltr" :options="options" aria-label="">
    <SplideSlide>
      <img alt="" class="main-slider-img" src="/images/slider.png"/>
    </SplideSlide>
    <SplideSlide>
      <img alt="" class="main-slider-img" src="/images/slider.png"/>
    </SplideSlide>
    <div class="splide__arrows" />
  </Splide>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

const options = ref({
  rewind: true,
  type    : 'loop',
  autoplay: 'pause',
  perPage : 1,
})
</script>

<style scoped lang="scss">
.main-slider-img {
  width: 100%;
}
</style>