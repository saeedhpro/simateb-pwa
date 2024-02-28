<template>
  <div class="login-page">
    <div class="intro-image d-flex flex-column justify-center align-center">
      <ImagesLoginImage class="login-image"/>
      <p>لطفا شماره موبایل خود را وارد کنید تا کد فعالسازی برای شما ارسال شود.</p>
      <div class="login-form d-flex flex-column justify-center full-width">
        <v-row>
          <v-col
            cols="12"
            >
            <v-text-field
                label="شماره همراه"
                v-model="form.tel"
                variant="outlined"
                rounded
                class="mt-8 text-left"
                bg-color="#fff"
                type="tel"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            >
            <div class="full-width d-flex flex-column justify-center align-center">
              <MainActionButton
                  title="ارسال کد ورود"
                  :disabled="form.tel.length != 11"
                  @click="sendCode"
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
})
import {useToast} from "vue-toastification";
const router = useRouter()
const toast = useToast()

const form = ref({
  tel: ''
})

const sendCode = () => {
  const {$postRequest: postRequest}=useNuxtApp()
  postRequest('/login', {
    phone_number: form.value.tel,
  })
      .then(res => {
        toast.success('کد با موفقیت ارسال شد')
        setTimeout(() => {
          router.push(`/verify?tel=${form.value.tel}`)
        }, 500)
      })
      .catch(err => {
        toast.error('متاسفانه خطایی رخ داده است')
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
</style>