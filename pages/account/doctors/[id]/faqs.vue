<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="faqs-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="faqs-page-top full-width">
      <h2 class="text-center mt-8">سوالات متداول</h2>
    </div>
    <div class="fags-list full-width d-flex flex-column align-center justify-start px-4 mt-8">
      <v-expansion-panels>
        <v-expansion-panel
            v-for="(f,i) in faqs"
            :key="i"
            :title="f.question"
            elevation="1"
            :ripple="false"
            :readonly="true"
            :text="f.answer"
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";

const router = useRouter()
const route = useRoute()

const id = route.params.id
const faqs = ref([])


definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const onBackClicked = () => {
  router.go(-1)
}

const getFaqs = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: list} = await getRequest(`/doctors/${id}/faqs`)
  faqs.value = list
  loading.value = false
  console.log(faqs.value)
}
getFaqs()
</script>

<style scoped lang="scss">

</style>