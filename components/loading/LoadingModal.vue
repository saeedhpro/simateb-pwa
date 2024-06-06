<template>
    <div class="main-page-modal relative py-0 px-0" :style="[isMainPage? '' : 'justify-content: center !important']">
      <img src="/images/main_bg.png" alt="" v-if="isMainPage"/>
      <div class="mt-8">
        <LogoIcon />
      </div>
      <p class="mt-8" v-if="isMainPage">
        هرآنچه از <span>سلامتی</span> میخواهید ...
      </p>
      <LoadingSpinnerComponent color="#4770FF" class="mt-16"/>
    </div>
</template>

<script setup lang="ts">
import LogoIcon from "~/components/logo/LogoIcon.vue";
const route = useRoute()
const isMainPage = computed(() => route.path == '/')

</script>

<style scoped lang="scss">

</style>