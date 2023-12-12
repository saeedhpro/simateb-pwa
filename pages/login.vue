<template>
  <div class="login-page">
    <div class="intro-image">
      <ImagesLoginImage />
      <p>لطفا شماره موبایل خود را وارد کنید تا کد فعالسازی برای شما ارسال شود.</p>
      <div class="login-form d-flex flex-column justify-center">
        <v-text-field
            label="شماره همراه"
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
import {definePageMeta} from "#imports";

definePageMeta({
  pageTransition: {
    name: 'rotate',
  }
})
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
.rotate-enter-active, .rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from, .rotate-enter-to {
  opacity: 0;
}
</style>