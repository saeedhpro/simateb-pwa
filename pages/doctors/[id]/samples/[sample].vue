<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="sample-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="pt-8 px-4 md:px-8 full-width d-flex flex-column align-center justify-start">
      <div class="doctor-details-box mt-8">
        <div class="doctor-avatar-box">
          <v-avatar
              color="grey"
              size="65"
              :rounded-full="true"
          >
            <v-img height="65px" width="65px" :src="doctor.logo"></v-img>
          </v-avatar>
        </div>
        <div class="doctor-name-box d-flex flex-column justify-center align-start">
          <div class="font-weight-bold">{{ doctor.full_name }}</div>
          <div class="mt-2">{{ doctor.organization?.profession?.name }}</div>
        </div>
      </div>
      <div class="d-flex flex-column align-start justify-start full-width mt-8">
        <SampleItem v-for="(s,i) in list.data" :key="i" :sample="s" style="margin-bottom: 40px"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import SampleItem from "~/components/doctor/SampleItem.vue";
import BackButton from "~/components/action/BackButton.vue";

const router = useRouter()
const route = useRoute()
const id = route.params.id

const loading = ref(true)
const step = ref(1)

const onBackClicked = () => {
  router.go(-1)
}

const list = ref({
  data: [],
})

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

const getSamples = async () => {
  loading.value = true
  const id = route.params.id
  const sample = route.params.sample
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: d} = await getRequest(`/doctors/${id}/samples/${sample}`)
  list.value.data = d ?? []
  loading.value = false
  list.value.data = d ?? []
}

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
onMounted(() => {
  nextTick(() => {
    getDoctor()
    getSamples()
  })
})
</script>

<style scoped lang="scss">

</style>