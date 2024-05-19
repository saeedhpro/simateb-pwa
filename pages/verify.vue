<template>
  <div class="login-page relative">
    <div class="intro-image d-flex flex-column justify-center align-center">
      <ImagesVerifyImage class="login-image"/>
      <p class="text-center">لطفا کد 5 رقمی ارسال شده از طریق پیامک را در قسمت زیر وارد کنید.</p>
      <div class="intro-image verify-form code-box">
        <v-otp-input
            v-model="form.code"
            class="ltr mt-2"
            bg-color="#7966FE"
            color="#fff"
            rounded-xl
            :length="5"
            placeholder="*"
            variant="underlined"
            height="93px"
        ></v-otp-input>
        <p class="text-center code-title mt-2">
           ارسال مجدد کد
        </p>
        <p class="text-center code-title mt-2">
          {{ timer }}
        </p>
        <MainActionButton
            v-if="timer == 0"
            class="login-button mt-2"
            title="ارسال دوباره کد"
            @click="sendCode"
            color="#7966FE"
            :width="'100%'"
        />
        <MainActionButton
            v-else
            class="login-button mt-2"
            title="ورود"
            :width="'100%'"
            :disabled="form.code.length != 5"
            color="#7966FE"
            @click="doLogin"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import MainActionButton from "~/components/buttons/MainActionButton.vue";
definePageMeta({
  middleware: 'guest',
  layout: 'login'
})
const router = useRouter()
const route = useRoute()
const app = useNuxtApp()

const authStore = useAuthStore()
// if (!route.query.tel) {
//   setTimeout(() => {
//     router.replace('/login')
//   }, 200)
// }
const token = useCookie("token")
const form = ref({
  tel: route.query.tel,
  code: ''
})

let timer = ref(60)
let interval = ref('')

const startTimer = (t = false) => {
  interval.value = setInterval(() => {
    if (timer.value == 0) {
      clearInterval(interval.value)
    } else {
      timer.value--
    }
  }, 1000)
}

startTimer()
const sendCode = () => {
  const {$postRequest: postRequest}=app
  postRequest('/login', {
    phone_number: form.value.tel,
  })
      .then(res => {
        timer.value = 60
        form.value.code = ''
        app.$toast.info('کد با موفقیت ارسال شد', {
          autoClose: 2000,
        });
        startTimer(true)
      })
      .catch(err => {
        app.$toast.error('متاسفانه خطایی رخ داده است', {
          autoClose: 2000,
        });
      })
  // console.log(form.value)
}
const doLogin = () => {
  const {$postRequest: postRequest}=app
  postRequest('/verify', {
    phone_number: form.value.tel,
    code: form.value.code,
  })
      .then(res => {
        app.$toast.info('با موفقیت وارد شد', {
          autoClose: 2000,
        });
        token.value = res?.data.token ?? ''
        authStore.user = res?.data.user
        authStore.token = res?.data.token
        router.push('/account')
      })
      .catch(err => {
        app.$toast.error('کد وارد شده صحیح نمی باشد', {
          autoClose: 2000,
        });
      })
}
</script>
<style scoped lang="scss">
.login-image {
  max-width: 360px;
}
.login-button {
  width: 100% !important;
  border-radius: 10px !important;
}
</style>