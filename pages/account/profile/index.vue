<template>
  <div class="account-page profile-page relative d-flex flex-column align-center justify-start">
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
    </div>
    <ExitButton @click="onExitClicked" />
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import ExitButton from "~/components/action/ExitButton.vue";
const router = useRouter()
const onBackClicked = () => {
  router.go(-1)
}

const onExitClicked = () => {
  router.replace('/')
}

const user = ref({
  full_name: 'سعید حیدری',
  phone_number: '09381412419'
})

const links = useProfileLink()
</script>

<style scoped lang="scss">

</style>