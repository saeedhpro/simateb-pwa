<template>
  <div class="login-page relative py-0 px-0">
    <BgGreen class="absolute top right"/>
    <BgBlue class="absolute top left"/>
    <BgBottomGreen class="absolute bottom right"/>
    <BgBottomBlue class="absolute bottom left"/>
    <IntroImage />
    <p class="mt-8">هرآنچه از <span class="hero">سلامتی</span>  میخواهید!</p>
    <LoadingSpinnerComponent class="mt-16"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})

import IntroImage from "~/components/images/IntroImage.vue";
import BgGreen from "~/components/intro/BgGreen.vue";
import BgBlue from "~/components/intro/BgBlue.vue";
import BgBottomGreen from "~/components/intro/BgBottomGreen.vue";
import BgBottomBlue from "~/components/intro/BgBottomBlue.vue";

const router = useRouter()

const goToLogin = () => {
  router.replace('/login')
}
goToLogin()

</script>
<style scoped lang="scss">
p {
  font-family: IRANYekanRegular;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: center;
  color: #3E5466 !important;
}
.hero {
  color: #7CA6E7 !important;
}
</style>