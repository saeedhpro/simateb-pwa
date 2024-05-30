<template>
    <div class="main-page-modal relative py-0 px-0">
<!--      <img src="/images/main_bg.svg" alt=""/>-->
      <div class="mt-8">
        <LogoIcon />
      </div>
      <p class="mt-8">
        هرآنچه از <span>سلامتی</span> میخواهید ...
      </p>
      <LoadingSpinnerComponent color="#7966FE" class="mt-16"/>
    </div>
</template>

<script setup lang="ts">
import LogoIcon from "~/components/logo/LogoIcon.vue";
</script>

<style scoped lang="scss">

</style>