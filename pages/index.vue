<template>
  <div class="login-page">
    <div class="intro-image">
      <IntroImage />
      <p>لطفا شماره موبایل خود را وارد کنید تا کد فعالسازی برای شما ارسال شود.</p>
      <div class="login-form d-flex flex-column justify-center">
        <v-text-field
            label="شماره تماس"
            v-model="form.tel"
            variant="outlined"
            rounded
            class="mt-8 text-left"
            bg-color="#fff"
        ></v-text-field>
        <MainActionButton
            title="ارسال کد ورود"
            :disabled="form.tel.length != 11"
            @click="sendCode"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import IntroImage from "~/components/images/IntroImage.vue";
import MainActionButton from "~/components/buttons/MainActionButton.vue";
const router = useRouter()

const form = ref({
  tel: ''
})

const sendCode = () => {
  router.push('/verify')
  // console.log(form.value)
}
</script>
<style scoped>

</style>