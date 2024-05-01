<template>
  <div class="reserve-page own relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="reserve-page-content px-8 pt-4 full-width">
      <div class="d-flex flex-row align-center justify-start">
        <v-avatar :image="user.logo" size="52"></v-avatar>
        <div class="mr-4 user-full-name">{{ user.full_name }}</div>
      </div>
      <div class="full-width my-8">
        <div class="reserve-header mb-8">نوبت های من</div>
        <div
            v-for="(a, i) in list.data"
            :key="i"
            class="own-reserve-item mt-8 d-flex flex-column align-start justify-start"
        >
          <div class="doctor-details d-flex flex-row align-center justify-start full-width mb-8">
            <v-avatar color="#D9D9D9" :image="a.organization.logo_link ? a.organization.logo_link : '/images/reserves/doctor.png'" size="52"></v-avatar>
            <div class="d-flex flex-column align-start justify-start full-width pr-4">
              <div class="doctor-full-name mb-2">
                {{ getDoctorName(a) }}
              </div>
              <div class="doctor-profession">
                {{ getDoctorProfession(a) }}
              </div>
            </div>
          </div>
          <div class="reserve-details full-width">
            <div class="reserve-detail">
              نوبت :
            </div>
            <div class="reserve-detail ltr">
              {{ convertStartAt(a.start_at) }}
            </div>
            <div class="reserve-detail">
              مراجعه کننده :
            </div>
            <div class="reserve-detail">
              {{ a.user.full_name }}
            </div>
            <div class="reserve-detail">
              وضعیت پذیرش :
            </div>
            <div class="reserve-detail">
              {{ getStatusFa(a) }}
            </div>
          </div>
          <div class="doctor-address">
            {{ a.organization.address }}
          </div>
        </div>
        <div v-if="loading" class="profile-page mt-4 h-100vh relative d-flex flex-column align-center justify-center">
          <LoadingComponent color="#9AC8EA"/>
        </div>
        <div v-if="!loading && list.meta.last_page > page" @click="paginate(page + 1)" class="more-button mt-6">مشاهده بیشتر</div>
        <div v-if="!loading && list.data.length == 0">
          <v-img src="/images/not_found.png" alt="" width="100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// import {useToast} from "vue-toastification";
import BackButton from "~/components/action/BackButton.vue";
import { useDayjs } from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()
import 'dayjs/locale/fa'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import jalaliday from 'jalaliday'
dayjs.locale('fa')
dayjs.extend(localizedFormat)
dayjs.extend(jalaliday)

const router = useRouter()
const route = useRoute()
// const toast = useToast()

const auth = useAuthStore();
const user = ref(auth.user)

const id = route.params.id

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const statusList = {
  0: 'در انتظار مراجعه',
  1: 'رزرو شده',
  2: 'پذیرش شده',
  3: 'لغو شده',
}
const page = ref(1)
const limit = ref(6)
const list = ref({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1
  }
})
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
  paginate()
}
const getReserves = async () => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: data, meta: meta} = await getRequest(`/doctors/${doctor.value.organization_id}/own_reserves?page=${page.value}&limit=${limit.value}`)
  list.value.data = [
    ...list.value.data,
    ...data,
  ]
  list.value.meta = {
    ...meta
  }
  loading.value = false
}
const paginate = (p = 1) => {
  page.value = p
  getReserves()
}

const getDoctorName = (app) => {
  if (app.organization.main_doctor) {
    return app.organization.main_doctor.full_name
  }
  if (app.organization.name) {
    return app.organization.name
  }
  return '-'
}
const getStatusFa = (app) => {
  let  status = app.waiting ? 0 : app.status
  return statusList[status]
}

const getDoctorProfession = (app) => {
  return app.organization.profession?.name ?? '-'
}
const convertStartAt = (startAt: string) => {
  let start = dayjs(startAt).calendar('jalali').locale('fa')
  let isToday = start.isSame(dayjs().calendar('jalali').locale('fa'), 'day')
  return (isToday ? 'امروز ' : '') + start.format('dddd D MMMM YYYY - ساعت: HH:mm').toString()
}
getDoctor()
</script>

<style scoped lang="scss">

</style>