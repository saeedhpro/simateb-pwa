<template>
  <div class="login-page relative">
    <div class="intro-image">
      <ImagesVerifyImage />
      <p class="text-center">لطفا کد 5 رقمی ارسال شده از طریق پیامک را در قسمت زیر وارد کنید.</p>
      <div class="intro-image code-box">
        <v-otp-input
            v-model="form.code"
            class="ltr mt-2"
            bg-color="#fff"
            color="#fff"
            rounded-xl
            :length="5"
            placeholder="*"
            variant="outlined"
            height="93px"
        ></v-otp-input>
        <p class="text-center code-title mt-2">
           ارسال مجدد کد
        </p>
        <p class="text-center code-title mt-2">
          {{ timer }}
        </p>
      </div>
      <MainActionButton
          v-if="timer === 0"
          class="login-button mt-2"
          title="ارسال دوباره کد"
          @click="sendCode"
          :width="'100%'"
      />
      <MainActionButton
          v-else
          class="login-button mt-2"
          title="ورود"
          :width="'100%'"
          :disabled="form.code.length != 5"
          @click="doLogin"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import MainActionButton from "~/components/buttons/MainActionButton.vue";
const router = useRouter()

const form = ref({
  tel: '09381412419',
  code: ''
})

let timer = ref(60)
let interval = ref('')

const startTimer = () => {
  setInterval(() => {
    if (timer.value === 0) {
      clearInterval(interval.value)
    } else {
      timer.value--
    }
  }, 1000)
}

startTimer()
const sendCode = () => {
  startTimer()
  // console.log(form.value)
}
const doLogin = () => {
  router.push('/account')
  // console.log(form.value)
}
</script>
<style scoped lang="scss">
.login-button {
  width: 100%;
  //position: absolute;
  //bottom: 20px;
  //right: 10%;
  //left: 10%;
}
</style>