<template>
  <div class="category-logo" :class="{'has-child': hasChild}">
    <img alt="" :src="logo">
<!--    <div class="sub-title" v-if="subTitle">{{subTitle}}</div>-->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  logo: {
    type: String,
    default: ''
  },
  hasChild: {
    type: Boolean,
    default: false
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">

</style>