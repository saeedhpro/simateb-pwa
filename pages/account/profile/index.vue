<template>
  <div class="account-page profile-page relative d-flex flex-column align-center justify-start">
    <BgGreen class="absolute top right"/>
    <BgBlue class="absolute top left"/>
    <BackButton
      @click="onBackClicked"
    />
    <div class="profile-title">صفحه کاربری</div>
    <ProfileImage class="mt-6"/>
    <div class="profile-full-name mt-2">{{ user.full_name }}</div>
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
    </div>
    <ExitButton @click="onExitClicked" />
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import ExitButton from "~/components/action/ExitButton.vue";
import BgGreen from "~/components/intro/BgGreen.vue";
import BgBlue from "~/components/intro/BgBlue.vue";
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
  token.value = ''
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