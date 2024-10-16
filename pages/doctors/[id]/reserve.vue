<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="reserve-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
<!--    <div class="reserve-page-top full-width" v-if="sliders.length > 0">-->
<!--      <v-carousel-->
<!--            :cycle="true"-->
<!--            height="320"-->
<!--            hide-delimiter-background-->
<!--            show-arrows="hover"-->
<!--            interval="3000"-->
<!--        >-->
<!--          <v-carousel-item-->
<!--              v-for="(s, i) in sliders"-->
<!--              :key="i"-->
<!--              :src="s"-->
<!--              :cover="true"-->
<!--          >-->
<!--          </v-carousel-item>-->
<!--        </v-carousel>-->
<!--    </div>-->
    <div class="reserve-page-bottom full-width">
      <div class="doctor-details-box">
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
    </div>
    <div class="doctor-reserve-form mt-16 mb-16">
      <v-stepper v-model="step" :flat="true" rounded :items="['علت مراجعه', 'انتخاب زمان', 'اطلاعات بیمار']">
        <template v-slot:item.1>
          <v-card :flat="true">
            <div class="doctor-reserve-form-title mb-4">
              لطفا بیمار را انتخاب کنید:
            </div>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="form-select"
                     :class="{'selected': reserveForm.selected_user == 'own'}"
                     @click="changeSelectedUser('own')">
                  <div class="form-select-icon-not"></div>
                  <div class="form-select-title">
                    برای خودم
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="form-select"
                     :class="{'selected': reserveForm.selected_user == 'other'}"
                     @click="changeSelectedUser('other')">
                  <div class="form-select-icon-not"></div>
                  <div class="form-select-title">
                    برای فرد دیگر
                  </div>
                </div>
              </v-col>
              <v-col cols="12" v-if="reserveForm.selected_user == 'other'">
                <v-text-field
                    label="شماره همراه بیمار"
                    v-model="reserveForm.tel"
                    variant="outlined"
                    class="mt-8 text-left rounded-lg"
                    bg-color="#fff"
                    type="tel"
                    density="compact"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="doctor-reserve-form-title my-4">
              برای درمان چه بیماری به پزشک مراجعه میکنید؟
            </div>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                    label=""
                    :items="caseTypes"
                    variant="outlined"
                    class="doctor-form-autocomplete rounded-lg"
                    v-model="reserveForm.case_type"
                    bg-color="#fff"
                    search="name"
                    custom-filter="name"
                    item-title="name"
                    item-value="name"
                    :return-object="false"
                    auto-select-first
                    density="compact"
                    theme="light"
                    placeholder="عنوان بیماری را انتخاب کنید"
                    @update:modelValue="onCaseTypeChanged"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card :flat="true">
            <div class="doctor-reserve-form-title mb-4">
              انتخاب زمان نوبت
            </div>
            <v-row v-if="schedules.length == 0">
              <v-col
                  cols="12"
              >
                <div>پزشک زمان خالی برای دریافت نوبت ندارد!</div>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <div class="form-select"
                     :class="{'selected': reserveForm.reserve_time_type == 'first'}"
                     @click="reserveForm.reserve_time_type = 'first'">
                  <div class="form-select-icon-not"></div>
                  <div class="form-select-title">
                    <div class="form-select-sub-title">
                      زودترین زمان نوبت خالی:
                    </div>
                    <div class="mt-2" v-if="getFirstTime">
                      {{convertStartAt(getFirstTime.start_at)}}
                    </div>
                    <div class="mt-2" v-else>
                      پزشک زمان خالی برای دریافت نوبت ندارد!
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" v-if="getOtherTimes().length > 0">
                <div class="form-select"
                     :class="{'selected': reserveForm.reserve_time_type == 'other'}"
                     @click="reserveForm.reserve_time_type = 'other'">
                  <div class="form-select-icon-not"></div>
                  <div class="form-select-title">
                    انتخاب زمان دیگر
                  </div>
                </div>
              </v-col>
              <v-col cols="12" v-if="reserveForm.reserve_time_type == 'other'">
                <v-row>
                  <v-col cols="12" v-for="(d,i) in getOtherTimes()" :key="i">
                    <div class="form-select"
                         :class="{'selected': isSelected(d)}"
                         @click="selectTime(d)"
                    >
                      <div class="form-select-icon-not"></div>
                      <div class="form-select-title">
                        {{convertStartAt(d.start_at)}}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" v-if="getOtherTimes().length == 0">
                    <div class="mt-2">
                      پزشک زمان خالی برای دریافت نوبت ندارد!
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card :flat="true">
            <div class="doctor-reserve-form-title text-right mb-4 font-weight-regular">
              لطفا مشخصات زیر را وارد کنید
            </div>
            <v-row>
              <v-col cols="6">
                <div class="doctor-reserve-form-title my-1">
                  نام :
                </div>
                <v-text-field
                    v-model="reserveForm.first_name"
                    variant="outlined"
                    class="mt-4 text-left rounded-lg"
                    bg-color="#fff"
                    type="text"
                    density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <div class="doctor-reserve-form-title my-1">
                  نام خانوادگی :
                </div>
                <v-text-field
                    v-model="reserveForm.last_name"
                    variant="outlined"
                    class="mt-4 text-left rounded-lg"
                    bg-color="#fff"
                    type="text"
                    density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="doctor-reserve-form-title my-1">
                  کد ملی :
                </div>
                <v-text-field
                    v-model="reserveForm.national_code"
                    variant="outlined"
                    class="mt-4 text-left rounded-lg"
                    bg-color="#fff"
                    type="tel"
                    density="compact"
                ></v-text-field>
              </v-col>
<!--              <v-col cols="12">-->
<!--                <div class="doctor-reserve-form-title my-4">-->
<!--                  تاریخ تولد : -->
<!--                </div>-->
<!--              </v-col>-->
            </v-row>
            <v-row>
<!--              <v-col sm="3" class="hidden d-sm-flex"></v-col>-->
              <v-col cols="6" sm="3">
                <div class="form-select"
                     :class="{'selected': reserveForm.gender == 'male'}"
                     @click="reserveForm.gender = 'male'">
                  <div class="form-select-icon-not"></div>
                  <div class="form-select-title">
                    مرد
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="3">
                <div class="form-select"
                     :class="{'selected': reserveForm.gender == 'female'}"
                     @click="reserveForm.gender = 'female'">
                  <div class="form-select-icon-not"></div>
                  <div class="form-select-title">
                    زن
                  </div>
                </div>
              </v-col>
              <v-col sm="3" class="hidden d-sm-flex"></v-col>
            </v-row>
          </v-card>
        </template>
        <template v-slot:actions>
          <div class="reserve-form-actions d-flex flex-row align-center justify-space-between full-width">
            <div @click="step--"  v-if="step > 1" class="reserve-form-action outlined">
              بازگشت
            </div>
            <div v-else ></div>
            <div @click="onGoNextClicked" class="reserve-form-action ">
              <span v-if="step < 3">ادامه</span>
              <span v-else>ثبت</span>
            </div>
          </div>
        </template>
      </v-stepper>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from "~/components/action/BackButton.vue";
import {useDayjs} from '#dayjs' // not need if you are using auto import
import 'dayjs/locale/fa'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import jalaliday from 'jalaliday'

const router = useRouter()
const route = useRoute()
const dayjs = useDayjs()
dayjs.locale('fa')
dayjs.extend(localizedFormat)
dayjs.extend(jalaliday)
const app = useNuxtApp()
const id = route.params.id

const auth = useAuthStore()

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const step = ref(1)

const reserveForm = ref({
  selected_user: 'own',
  gender: '',
  reserve_time_type: 'first',
  selected_time: null,
  case_type: '',
  tel: '',
  first_name: '',
  last_name: '',
  national_code: '',
  start_at: '',
})

const caseTypes = ref([])
const sliders = ref([])
const schedules = ref([])

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

const onBackClicked = () => {
  router.go(-1)
}

const getDoctor = async () => {
  loading.value = true
  const {$getRequest: getRequest}=app
  const {data: d} = await getRequest(`/doctors/${id}`)
  doctor.value = {
    ...d,
    logo: d.logo || '/images/doctors/doctor.png'
  }
  loading.value = false
}

const getCaseTypes = async () => {
  const {$getRequest: getRequest}=app
  caseTypes.value = await getRequest(`/doctors/${id}/schedules/all`)
}

const getSliders = async () => {
  const {$getRequest: getRequest}=app
  sliders.value = await getRequest(`/doctors/${id}/sliders`)
}

const getSchedules = async (c) => {
  const {$getRequest: getRequest}=app
  const {data: data} = await getRequest(`/doctors/${id}/schedules?case=${c}`)
  schedules.value = data
  if (schedules.value.length > 0) {
    selectTime(schedules.value[0])
  }
}

const getFirstTime = () => {
  if (schedules.value.length > 0) {
    return schedules.value[0]
  }
  return null;
}

const getOtherTimes = () => {
  if (schedules.value.length > 1) {
    return schedules.value.slice(1)
  }
  return [];
}

const convertStartAt = (startAt: string) => {
  let start = dayjs(startAt).calendar('jalali').locale('fa')
  let isToday = start.isSame(dayjs().calendar('jalali').locale('fa'), 'day')
  return (isToday ? 'امروز ' : '') + start.format('dddd D MMMM YYYY - ساعت: HH:mm').toString()
}

const selectTime = (time: Object) => {
  reserveForm.value.selected_time = time
}

const isSelected = (time: Object) => {
  let selected = reserveForm.value.selected_time
  return selected ? selected.id == time.id : false
}

const onGoNextClicked = () => {
  if (step.value == 1 && !validateStepOne()) {
    return
  }
  if (step.value == 2 && !validateStepTwo()) {
    return
  }
  if (step.value == 3 && !validateStepThree()) {
    return
  }
  if (step.value < 3) {
    step.value++
  } else {
    reserve()
  }
}

const validateStepOne = () => {
  let validated = true
  if (!reserveForm.value.selected_user) {
    validated = false
    app.$toast.error('تاریخ بیمار را انتخاب کنید', {
      autoClose: 2000,
    })
  }
  if (reserveForm.value.selected_user == 'other' && !reserveForm.value.tel) {
    validated = false
    app.$toast.error('شماره بیمار را وارد کنید', {
      autoClose: 2000,
    })
  }
  if (!reserveForm.value.case_type) {
    validated = false
    app.$toast.error('علت مراجعه را وارد کنید', {
      autoClose: 2000,
    })
  }
  return validated
}

const validateStepTwo = () => {
  let validated = true
  if (reserveForm.value.reserve_time_type == 'other' && !reserveForm.value.selected_time) {
    validated = false
    app.$toast.error('تاریخ رزرو را انتخاب کنید', {
      autoClose: 2000,
    })
  }
  if (reserveForm.value.reserve_time_type == 'first' && !reserveForm.value.selected_time) {
    validated = false
    app.$toast.error('تاریخ رزرو را انتخاب کنید', {
      autoClose: 2000,
    })
  }
  return validated
}

const validateStepThree = () => {
  let validated = true
  if (!reserveForm.value.first_name) {
    validated = false
    app.$toast.error('نام بیمار را وارد کنید', {
      autoClose: 2000,
    })
  }
  if (!reserveForm.value.last_name) {
    validated = false
    app.$toast.error('نام خانوادگی بیمار را وارد کنید', {
      autoClose: 2000,
    })
  }
  if (!reserveForm.value.national_code) {
    validated = false
    app.$toast.error('کد ملی بیمار را وارد کنید', {
      autoClose: 2000,
    })
  }
  if (!reserveForm.value.gender) {
    validated = false
    app.$toast.error('جنسیت بیمار را وارد کنید', {
      autoClose: 2000,
    })
  }
  return validated
}

const onCaseTypeChanged = (c) => {
  getSchedules(c)
}

const reserve = async () => {
  const form = {
    gender: reserveForm.value.gender,
    tel: reserveForm.value.tel,
    first_name: reserveForm.value.first_name,
    last_name: reserveForm.value.last_name,
    case_type: reserveForm.value.case_type,
    start_at: reserveForm.value.selected_time?.start_at,
    national_code: reserveForm.value.national_code,
    organization_id: doctor.value.organization_id,
  }
  const {$postRequest: postRequest}=app
  const res = await postRequest(`/reserve`, form)
  app.$toast.error('درخواست رزرو وقت با موفقیت برای دکتر ارسال شد. درصورت تایید توسط دکتر از طریق پیامک اطلاع رسانی خواهید شد!', {
    autoClose: 2000,
  });
  setTimeout(() => {
    router.back()
  }, 500)
}

const changeSelectedUser = (type) => {
  if (type == 'own') {
    reserveForm.value.first_name = auth.user?.fname
    reserveForm.value.last_name = auth.user?.lname
    reserveForm.value.national_code = auth.user?.cardno
    reserveForm.value.gender = auth.user?.gender
    reserveForm.value.tel = auth.user?.tel
  } else {
    reserveForm.value.first_name = ''
    reserveForm.value.last_name = ''
    reserveForm.value.national_code = ''
    reserveForm.value.gender = ''
    reserveForm.value.tel = ''
  }
  reserveForm.value.selected_user = type
}

getDoctor()
getCaseTypes()
getSliders()
changeSelectedUser('own')
</script>

<style scoped lang="scss">

</style>