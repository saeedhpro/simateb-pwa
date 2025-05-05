<template>
  <div class="account-page profile-page relative d-flex flex-column align-center justify-start px-0 py-0">
    <BackButton
      @click="onBackClicked"
    />
    <div class="d-flex flex-column align-center justify-start account-page-top">
      <div class="profile-title">پروفایل</div>
      <ProfileImage class="mt-4"/>
      <div class="profile-full-name mt-2">{{ user.full_name }}</div>
      <div class="profile-full-name mt-2">{{ user.tel }}</div>
    </div>
    <div class="profile-links full-width mt-6">
      <ProfileLink
        v-for="(l,i) in links"
        :key="i"
        :link="l.link"
        :icon="l.icon"
        :title="l.title"
      />
      <ProfileLink
          :icon="'/images/links/4.png'"
          :title="'دعوت از دوستان'"
          @click.native="referral"
          class="pointer"
      />
      <ExitButton @click="onExitClicked" />
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import ExitButton from "~/components/action/ExitButton.vue";

const router = useRouter()
const token = useCookie("token", {
  maxAge: 259200,
})

definePageMeta({
  middleware: 'auth'
})

const onBackClicked = () => {
  router.go(-1)
  // router.push('/account')
}

const onExitClicked = () => {
  const auth = useAuthStore()
  token.value = ''
  auth.user = null
  auth.token = ''
  router.replace('/')
}

const user = ref({
  full_name: '',
  tel: '',
})

const referral = async ($event) => {
  $event.preventDefault()
  await shareText(`https://pwa.sabaapp.ir?ref=${user.value.tel}`)
}
const shareText = async (text: string) => {
  try {
    await navigator.share({
      text: text
    });
  } catch (error) {
  }
}

const links = useProfileLink()

const getUser = async () => {
  const { $getRequest: getRequest } = useNuxtApp();
  const res = await getRequest(`/me`);
  user.value = {
    ...res.data,
  }
}

getUser()
</script>

<style scoped lang="scss">

</style>