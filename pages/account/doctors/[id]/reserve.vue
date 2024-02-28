<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="reserve-page relative d-flex flex-column align-center justify-start">
    <div class="reserve-page-top full-width">
      <v-carousel
            :cycle="true"
            height="320"
            hide-delimiter-background
            show-arrows="hover"
            interval="3000"
        >
          <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
          >
            <v-sheet
                :color="colors[i]"
                height="100%"
            >
              <div class="d-flex fill-height justify-center align-center">
                <div class="text-h2">
                  {{ slide }} Slide
                </div>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
    </div>
    <div class="reserve-page-bottom mt-16 full-width">
      <div class="doctor-details-box">
        <div class="doctor-avatar-box">
          <v-avatar
              color="grey"
              size="120"
              :rounded-full="true"
          >
            <v-img height="90px" width="90px" :src="doctor.logo"></v-img>
          </v-avatar>
        </div>
        <div class="doctor-name-box d-flex flex-column justify-center align-start">
          <div class="font-weight-bold">{{ doctor.full_name }}</div>
          <div class="mt-2">{{ doctor.organization?.profession?.name }}</div>
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
                       @click="reserveForm.selected_user = 'own'">
                    <div class="form-select-icon-not"></div>
                    <div class="form-select-title">
                      برای خودم
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-select"
                       :class="{'selected': reserveForm.selected_user == 'other'}"
                       @click="reserveForm.selected_user = 'other'">
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
              <v-row>
                <v-col cols="12">
                  <div class="form-select"
                       :class="{'selected': reserveForm.reserve_time_type == 'first'}"
                       @click="reserveForm.reserve_time_type = 'first'">
                    <div class="form-select-icon-not"></div>
                    <div class="form-select-title">
                      <div class="form-select-sub-title">
                        زودترین زمان نوبت خالی:
                      </div>
                      <div class="mt-2">
                        امروز (شنبه) - ساعت 15
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12">
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
                    <v-col cols="12">
                      <div class="form-select"
                           :class="{'selected': reserveForm.reserve_time_type == ''}"
                           >
                        <div class="form-select-icon-not"></div>
                        <div class="form-select-title">
                          امروز (شنبه) - ساعت 15
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="form-select"
                           :class="{'selected': reserveForm.reserve_time_type == ''}"
                           >
                        <div class="form-select-icon-not"></div>
                        <div class="form-select-title">
                          امروز (شنبه) - ساعت 15
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </template>

          <template v-slot:item.3>
            <v-card :flat="true">
              <div class="doctor-reserve-form-title text-center mb-4">
                لطفا مشخصات زیر را وارد کنید
              </div>
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="form-select"
                       :class="{'selected': reserveForm.selected_user == 'own'}"
                       @click="reserveForm.selected_user = 'own'">
                    <div class="form-select-icon-not"></div>
                    <div class="form-select-title">
                      برای خودم
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-select"
                       :class="{'selected': reserveForm.selected_user == 'other'}"
                       @click="reserveForm.selected_user = 'other'">
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
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card>
          </template>
          <template v-slot:actions>
            <div class="reserve-form-actions d-flex flex-row align-center justify-space-between full-width">
              <div @click="step--"  v-if="step > 1" class="reserve-form-action outlined">
                بازگشت
              </div>
              <div v-else ></div>
              <div @click="step++" class="reserve-form-action ">
                <span v-if="step < 3">ادامه</span>
                <span v-else>ثبت</span>
              </div>
            </div>
          </template>
        </v-stepper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useToast} from "vue-toastification";
const router = useRouter()
const route = useRoute()
const toast = useToast()

const id = route.params.id

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const step = ref(1)

const reserveForm = ref({
  selected_user: 'own',
  reserve_time_type: 'first',
  case_type: '',
  tel: ''
})

const caseTypes = ref([])

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
const colors = [
  'indigo',
  'warning',
  'pink darken-2',
  'red lighten-1',
  'deep-purple accent-4',
]
const slides = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
]
const onBackClicked = () => {
  router.go(-1)
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

const getCaseTypes = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: cases} = await getRequest(`/doctors/${id}/cases`)
  caseTypes.value = cases
}
getDoctor()
getCaseTypes()
</script>

<style scoped lang="scss">

</style>