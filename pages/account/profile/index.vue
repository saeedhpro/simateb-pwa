<template>
  <div class="account-page profile-page relative d-flex flex-column align-center justify-start">
    <BackButton
      @click="onBackClicked"
    />
    <div class="d-flex flex-column align-center justify-start account-page-top">
      <div class="profile-title">صفحه کاربری</div>
      <ProfileImage class="mt-6"/>
      <div class="profile-full-name mt-2">{{ user.full_name }}</div>
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
const token = useCookie("token")

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
  full_name: 'سعید حیدری',
  phone_number: '09381412419'
})

const referral = async ($event) => {
  $event.preventDefault()
  await shareText(`https://pwa.sabaapp.ir?ref=${user.value.phone_number}`)
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
</script>

<style scoped lang="scss">

</style>