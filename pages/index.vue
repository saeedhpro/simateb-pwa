<template>
  <div class="main-page relative py-0 px-0">
    <img src="/images/main_bg.svg" alt=""/>
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

definePageMeta({
  layout: 'login'
})

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