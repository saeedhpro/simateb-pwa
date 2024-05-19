<template>
  <div class="login-page">
    <div class="intro-image d-flex flex-column justify-center align-center">
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
            <div class="full-width d-flex flex-column justify-center align-center">
              <MainActionButton
                  title="ارسال کد"
                  :disabled="form.tel.length != 11"
                  @click="sendCode"
                  class="login-button"
                  color="#7966FE"
                  rounded="sm"
              />
            </div>
          </v-col>
        </v-row>
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
const app = useNuxtApp()

const router = useRouter()

const form = ref({
  tel: ''
})

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
          window.location.href = `/verify?tel=${form.value.tel}`
        }, 500)
      })
      .catch(err => {
        app.$toast.error('متاسفانه خطایی رخ داده است', {
          autoClose: 2000,
        });
        console.log(err, "err")
      })
}
</script>
<style scoped>
.rotate-enter-active, .rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from, .rotate-enter-to {
  opacity: 0;
}
.login-image {
  max-width: 360px;
}
.login-button {
  width: 100% !important;
  border-radius: 10px !important;
}
</style>