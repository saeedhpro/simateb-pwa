<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="faqs-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="faqs-page-top full-width">
      <h3 class="text-center mt-8">پرسش های متداول</h3>
    </div>
    <div class="fags-list full-width d-flex flex-column align-center justify-start px-4 mt-8">
      <v-expansion-panels v-if="faqs.length > 0">
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
    <div class="full-width" v-if="faqs.length == 0">
      <v-img src="/images/not_found.png" alt="" width="70%" class="mx-auto"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";

const router = useRouter()
const route = useRoute()

const id = route.params.id
const faqs = ref([])

const loading = ref(true)
const onBackClicked = () => {
  router.go(-1)
}

const getFaqs = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: list} = await getRequest(`/doctors/${id}/faqs`)
  faqs.value = list
  loading.value = false
}
getFaqs()
</script>

<style scoped lang="scss">

</style>