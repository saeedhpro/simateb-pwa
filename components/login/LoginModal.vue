<template>
  <div class="text-center login-page">
    <v-dialog
        v-model="show"
        max-width="400"
    >
      <v-card elevation="1">
        <v-card-text rounded>
          <div v-if="!codeSent" class="intro-image d-flex flex-column justify-center align-center py-8">
            <ImagesLoginImage class="login-image"/>
            <p>لطفا شماره موبایل خود را وارد کنید تا کد فعالسازی برای شما ارسال شود</p>
            <div class="login-form d-flex flex-column justify-center full-width">
              <v-row>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      label="شماره همراه"
                      v-model="form.tel"
                      variant="outlined"
                      class="mt-8 text-left login-phone"
                      bg-color="#fff"
                      type="tel"
                      density="compact"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                  <div class="full-width d-flex flex-row gap-[10px] justify-center align-center">
                    <v-btn class="main-action-button mx-auto" rounded="sm" @click="authStore.closeLoginModal()" variant="flat" text="#fff" height="48px" width="50%">
                      لغو
                    </v-btn>
                    <MainActionButton
                        title="ارسال کد"
                        :disabled="form.tel.length != 11"
                        @click="sendCode"
                        class="login-button"
                        color="#84a9fe"
                        rounded="sm"
                        width="50%"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div v-else class="intro-image d-flex flex-column justify-center align-center">
            <ImagesVerifyImage class="login-image"/>
            <p class="text-center">لطفا کد 5 رقمی ارسال شده از طریق پیامک را در قسمت زیر وارد کنید.</p>
            <div class="intro-image verify-form code-box">
              <v-otp-input
                  v-model="form.code"
                  class="ltr mt-2"
                  bg-color="#84a9fe"
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
              <div class="full-width d-flex flex-row gap-[10px] justify-center align-center">
                <v-btn class="main-action-button mx-auto" rounded="sm" @click="authStore.closeLoginModal()" variant="flat" text="#fff" height="48px" width="50%">
                  بستن
                </v-btn>
                <MainActionButton
                    v-if="timer == 0"
                    class="login-button mt-2"
                    title="ارسال دوباره کد"
                    @click="sendCode"
                    color="#84a9fe"
                    :width="'50%'"
                />
                <MainActionButton
                    v-else
                    class="login-button mt-2"
                    title="ورود"
                    :width="'50%'"
                    :disabled="form.code.length != 5"
                    color="#84a9fe"
                    @click="doLogin"
                />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import MainActionButton from "~/components/buttons/MainActionButton.vue";

const authStore = useAuthStore()
const show = computed(() => authStore.isOpenLogin)
const app = useNuxtApp()

const form = ref({
  tel: '',
  code: ''
})
const token = useCookie("token")
const codeSent = ref(false)
let timer = ref(60)
let interval = ref('')
const startTimer = () => {
  interval.value = setInterval(() => {
    if (timer.value == 0) {
      clearInterval(interval.value)
      codeSent.value = false
      form.value.code = ''
    } else {
      timer.value--
    }
  }, 1000)
}

const sendCode = () => {
  const {$postRequest: postRequest}=app
  postRequest('/login', {
    phone_number: form.value.tel,
  })
      .then(res => {
        app.$toast.info('کد با موفقیت ارسال شد', {
          autoClose: 2000,
        });
        setTimeout(() => {
          codeSent.value = true
          timer.value = 60
          startTimer()
        }, 500)
      })
      .catch(err => {
        app.$toast.error('متاسفانه خطایی رخ داده است', {
          autoClose: 2000,
        });
      })
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
        authStore.closeLoginModal()
        clearInterval(interval.value)
        timer.value = 60
      })
      .catch(err => {
        app.$toast.error('کد وارد شده صحیح نمی باشد', {
          autoClose: 2000,
        });
      })
}

</script>

<style scoped lang="scss">

</style>