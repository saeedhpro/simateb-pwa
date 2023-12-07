<template>
  <div class="login-page relative">
    <div class="intro-image">
      <p>کد فعالسازی به شماره زیر پیامک شد.</p>
      <div class="login-form d-flex flex-column justify-center">
        <div class="phone-box">{{ form.tel }}</div>
      </div>
      <div class="intro-image code-box mt-16">
        <p class="text-right code-title">کد فعالسازی:</p>
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
        <p class="text-right code-title mt-2">
          {{ timer }} ثانیه تا دریافت مجدد کد فعالسازی
        </p>
      </div>
      <MainActionButton
          v-if="timer === 0"
          class="login-button"
          title="ارسال دوباره کد"
          @click="sendCode"
      />
      <MainActionButton
          v-else
          class="login-button"
          title="ورود"
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
.phone-box {
  max-width: 180px;
  width: 100%;
  height: 44px;
  border: 1px solid #ADABFF;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 20px auto 0;
}
.login-button {
  position: absolute;
  bottom: 50px;
  right: 10%;
  left: 10%;
}
.code-box {
  max-width: 300px;
  margin: 0 auto;
}
.code-title {
  font-family: IRANYekanRegular;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  text-align: right;
  color: #206EE7;
}
</style>