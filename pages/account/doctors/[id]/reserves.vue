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

const doctor = ref({
  id: 0,
  fname: '',
  lname: '',
  full_name: '',
  address: '',
  logo: '/images/doctors/doctor.png',
  point: 0,
  tel: '',
  user_group_id: 2,
  user_group: {
    id: 2,
    name: '',
  },
  liked: false,
  organization_id: 0,
  organization: {
    id: 0,
    name: '',
    logo_link: '',
    profession: {
      id: 0,
      name: '',
    }
  },
})

const getDoctor = async () => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: d} = await getRequest(`/doctors/${id}`)
  doctor.value = {
    ...d,
    logo: d.logo || '/images/doctors/doctor.png'
  }
  loading.value = false
}

getDoctor()
</script>

<style scoped lang="scss">

</style>