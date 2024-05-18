<template>
  <v-card
      class="mx-auto"
      max-width="344"
      rounded="lg"
      width="100%"
  >
    <v-card-item>
    </v-card-item>
    <v-carousel
        hide-delimiters
        height="170px"
    >
      <v-carousel-item
          v-for="(item,i) in sample.images"
          :key="i"
          :src="item"
          :cover="false"
      ></v-carousel-item>
    </v-carousel>
    <v-card-text>
      {{ sample.description }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  sample: {
    type: Object,
    default: {
      id: 1,
      description: '',
      images: [
        '/images/samples/sample_1.png',
        '/images/samples/sample_1.png',
        '/images/samples/sample_1.png',
        '/images/samples/sample_1.png',
        '/images/samples/sample_1.png',
      ],
    }
  }
})
</script>

<style scoped lang="scss">

</style>