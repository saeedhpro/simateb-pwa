<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="reserve-page relative d-flex flex-column align-center justify-start">
  </div>
</template>

<script setup lang="ts">

// import {useToast} from "vue-toastification";
const router = useRouter()
const route = useRoute()
// const toast = useToast()

const id = route.params.id

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)

const onBackClicked = () => {
  router.go(-1)
}

const getDoctor = async () => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: d} = await getRequest(`/doctors/${id}`)
  loading.value = false
}

</script>

<style scoped lang="scss">

</style>