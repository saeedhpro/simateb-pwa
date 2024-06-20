<template>
  <v-card
      class="mx-auto"
      max-width="344"
      rounded="lg"
      width="100%"
      style="position: relative"
  >
    <v-carousel
        hide-delimiters
        height="200px"
        :show-arrows="sample.image_list.length > 1"
    >
      <template v-slot:prev="{ props }">
        <v-btn
            color="info"
            variant="text"
            @click="props.onClick"
            icon="mdi-chevron-right"
            style="position: absolute; bottom: 0; right: 0;"
        >
        </v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn
            color="info"
            variant="text"
            @click="props.onClick"
            icon="mdi-chevron-left"
            style="position: absolute; bottom: 0; left: 0;"
        >
        </v-btn>
      </template>
      <v-carousel-item
          v-for="(item,i) in sample.image_list"
          :key="i"
          :src="item"
          :cover="false"
      ></v-carousel-item>
    </v-carousel>
    <v-card-text>
      <div class="full-width" :style="showMoreClass">{{ sample.description }}</div>
      <div class="full-width" style="display: flex; flex-direction: row; justify-content: flex-end">
        <v-btn variant="outlined" color="info" style="margin-top: 10px" @click="onClick(!showMore)">
          <span v-if="showMore">کمتر</span>
          <span v-else>بیشتر</span>
        </v-btn>
      </div>
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
      image_list: [
        '/images/samples/sample_1.png',
      ],
    }
  }
})
const showMore = ref<Boolean>(false)
const onClick = (show) => {
  showMore.value = show
}
const showMoreClass = computed(() => {
  if (showMore.value) {
    return 'height: auto;'
  }
  return 'height: 44px; overflow-y: hidden;'
})
</script>

<style scoped lang="scss">

</style>