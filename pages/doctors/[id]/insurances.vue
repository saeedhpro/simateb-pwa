<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="insurances-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="insurances-page-top full-width">
      <h3 class="text-center mt-8">بیمه های طرف قرارداد</h3>
    </div>
    <div class="fags-list full-width d-flex flex-column align-center justify-start px-4 mt-8">
      <div class="flex full-width flex-col items-start justify-start " v-if="insurances.length > 0">
        <div class="flex flex-row items-center justify-start px-4 py-2 elevation-1 rounded-lg	"
            v-for="(f,i) in insurances"
            :key="i"
        >
          <span>بیمه: </span>
          <span>{{ f.name }}</span>
        </div>
      </div>
    </div>
    <div class="full-width" v-if="insurances.length == 0">
      <v-img src="/images/not_found.png" alt="" width="70%" class="mx-auto"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";

const router = useRouter()
const route = useRoute()

const id = ref<number>(parseInt(route.params.id as string))
const insurances = ref([])

const loading = ref(true)
const onBackClicked = () => {
  router.go(-1)
}

const getInsurances = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: list} = await getRequest(`/doctors/${id.value}/insurances`)
  insurances.value = list
  loading.value = false
}
getInsurances()
</script>

<style scoped lang="scss">

</style>