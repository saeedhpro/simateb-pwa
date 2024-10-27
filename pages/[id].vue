<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="doctor-profile relative d-flex flex-column align-center justify-start">
    <div class="search-header">
      <BackButton
          @click="onBackClicked"
      />
      <LikeButton
          :liked="doctor.liked"
          @click="onLikeClicked"
          v-if="auth.user"
      />
      <v-container class="mt-8">
        <v-row>
          <v-col cols="4" md="3" sm="5">
            <v-img height="84" width="84" :src="doctor.logo" />
          </v-col>
          <v-col cols="8" md="9" sm="7">
            <div class="d-flex" style="flex-direction: column; align-items: flex-start; justify-content: flex-start;">
              <div class="full-width">
                {{ doctor.full_name }}
              </div>
              <div class="mt-3 full-width d-flex flex-row justify-start items-center">
                <span>
                {{ doctor.work_experience ?? 0}}
                </span>
                سال تجربه
              </div>
              <div class="mt-3 full-width">
                {{ doctor.organization?.profession?.name }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col align-self="center">
            <div class="justify-center align-center d-flex flex-row">
            <span style="background: #0DAD25; padding: 7px 10px; color: white; border-radius: 7px; margin: 0 10px; min-width: 65px; display: flex; justify-content: center; align-items: center;">
              <span style="margin: 0 4px;">
                {{ doctor.rate.toFixed(1) ?? 0 }}
              </span>
              از 5
            </span>
              <span>
              رضایت (<span>{{ doctor.rate_count ?? 0 }}</span> نظر)
            </span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="doctor-tabs">
      <div @click="goToReservePage" class="doctor-tab">
        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 17.9177V2.46765C0 1.91537 0.447715 1.46765 1 1.46765H2.28318V2.11999C2.28318 2.93061 2.94031 3.58775 3.75094 3.58775C4.56156 3.58775 5.21869 2.93061 5.21869 2.11999V1.46765H13.8622V2.2423C13.8622 2.98537 14.4645 3.58775 15.2076 3.58775C15.9507 3.58775 16.553 2.98537 16.553 2.2423V1.46765H17.9178C18.47 1.46765 18.9178 1.91537 18.9178 2.46765V7.09405L17.5315 6.27863V5.48471C17.5315 4.93242 17.0838 4.48471 16.5315 4.48471H2.46776C1.91547 4.48471 1.46776 4.93242 1.46776 5.48471V16.6945C1.46776 17.2468 1.91547 17.6945 2.46776 17.6945H8.23575L9.13271 18.9177H1C0.447715 18.9177 0 18.4699 0 17.9177Z" fill="#0A1E88"/>
          <path d="M2.28027 6.50132V6.38123C2.28027 5.82894 2.72799 5.38123 3.28027 5.38123H3.48191C4.03419 5.38123 4.48191 5.82894 4.48191 6.38123V6.50132C4.48191 7.0536 4.03419 7.50132 3.48191 7.50132H3.28027C2.72799 7.50132 2.28027 7.0536 2.28027 6.50132Z" fill="#0A1E88"/>
          <path d="M5.54199 6.50156V6.38147C5.54199 5.82918 5.98971 5.38147 6.54199 5.38147H6.74363C7.29591 5.38147 7.74363 5.82918 7.74363 6.38147V6.50156C7.74363 7.05385 7.29591 7.50156 6.74363 7.50156H6.54199C5.98971 7.50156 5.54199 7.05385 5.54199 6.50156Z" fill="#0A1E88"/>
          <path d="M5.54199 9.43638V9.31628C5.54199 8.764 5.98971 8.31628 6.54199 8.31628H6.74363C7.29591 8.31628 7.74363 8.764 7.74363 9.31628V9.43638C7.74363 9.98866 7.29591 10.4364 6.74363 10.4364H6.54199C5.98971 10.4364 5.54199 9.98866 5.54199 9.43638Z" fill="#0A1E88"/>
          <path d="M5.54199 12.6981V12.578C5.54199 12.0257 5.98971 11.578 6.54199 11.578H6.74363C7.29591 11.578 7.74363 12.0257 7.74363 12.578V12.6981C7.74363 13.2504 7.29591 13.6981 6.74363 13.6981H6.54199C5.98971 13.6981 5.54199 13.2504 5.54199 12.6981Z" fill="#0A1E88"/>
          <path d="M5.54199 15.796V15.6759C5.54199 15.1236 5.98971 14.6759 6.54199 14.6759H6.74363C7.29591 14.6759 7.74363 15.1236 7.74363 15.6759V15.796C7.74363 16.3483 7.29591 16.796 6.74363 16.796H6.54199C5.98971 16.796 5.54199 16.3483 5.54199 15.796Z" fill="#0A1E88"/>
          <path d="M8.80957 6.50193V6.38184C8.80957 5.82955 9.25729 5.38184 9.80957 5.38184H10.0112C10.5635 5.38184 11.0112 5.82955 11.0112 6.38184V6.50193C11.0112 7.05421 10.5635 7.50193 10.0112 7.50193H9.80957C9.25729 7.50193 8.80957 7.05421 8.80957 6.50193Z" fill="#0A1E88"/>
          <path d="M8.80957 9.43638V9.31628C8.80957 8.764 9.25729 8.31628 9.80957 8.31628H10.0112C10.5635 8.31628 11.0112 8.764 11.0112 9.31628V9.43638C11.0112 9.98866 10.5635 10.4364 10.0112 10.4364H9.80957C9.25729 10.4364 8.80957 9.98866 8.80957 9.43638Z" fill="#0A1E88"/>
          <path d="M14.6758 6.50144V6.38135C14.6758 5.82906 15.1235 5.38135 15.6758 5.38135H15.8774C16.4297 5.38135 16.8774 5.82906 16.8774 6.38135V6.50144C16.8774 7.05373 16.4297 7.50144 15.8774 7.50144H15.6758C15.1235 7.50144 14.6758 7.05373 14.6758 6.50144Z" fill="#0A1E88"/>
          <path d="M11.7412 6.50156V6.38147C11.7412 5.82918 12.1889 5.38147 12.7412 5.38147H12.9428C13.4951 5.38147 13.9428 5.82918 13.9428 6.38147V6.50156C13.9428 7.05385 13.4951 7.50156 12.9428 7.50156H12.7412C12.1889 7.50156 11.7412 7.05385 11.7412 6.50156Z" fill="#0A1E88"/>
          <path d="M2.28027 9.43638V9.31628C2.28027 8.764 2.72799 8.31628 3.28027 8.31628H3.48191C4.03419 8.31628 4.48191 8.764 4.48191 9.31628V9.43638C4.48191 9.98866 4.03419 10.4364 3.48191 10.4364H3.28027C2.72799 10.4364 2.28027 9.98866 2.28027 9.43638Z" fill="#0A1E88"/>
          <path d="M2.28027 12.6981V12.578C2.28027 12.0257 2.72799 11.578 3.28027 11.578H3.48191C4.03419 11.578 4.48191 12.0257 4.48191 12.578V12.6981C4.48191 13.2504 4.03419 13.6981 3.48191 13.6981H3.28027C2.72799 13.6981 2.28027 13.2504 2.28027 12.6981Z" fill="#0A1E88"/>
          <path d="M2.28027 15.796V15.6759C2.28027 15.1236 2.72799 14.6759 3.28027 14.6759H3.48191C4.03419 14.6759 4.48191 15.1236 4.48191 15.6759V15.796C4.48191 16.3483 4.03419 16.796 3.48191 16.796H3.28027C2.72799 16.796 2.28027 16.3483 2.28027 15.796Z" fill="#0A1E88"/>
          <ellipse cx="15.2533" cy="13.7804" rx="7.7465" ry="7.7465" fill="white"/>
          <path d="M22.1815 13.7802C22.1815 17.6081 19.0783 20.7113 15.2504 20.7113C11.4225 20.7113 8.31934 17.6081 8.31934 13.7802C8.31934 9.95227 11.4225 6.84912 15.2504 6.84912C19.0783 6.84912 22.1815 9.95227 22.1815 13.7802Z" fill="#0A1E88"/>
          <path d="M22.1815 13.7802C22.1815 17.6081 19.0783 20.7113 15.2504 20.7113C11.4225 20.7113 8.31934 17.6081 8.31934 13.7802C8.31934 9.95227 11.4225 6.84912 15.2504 6.84912C19.0783 6.84912 22.1815 9.95227 22.1815 13.7802Z" stroke="#0A1E88"/>
          <path d="M13.5332 9.80542V11.2302C13.5332 11.7825 13.0855 12.2302 12.5332 12.2302H11.4346C10.8823 12.2302 10.4346 12.6779 10.4346 13.2302V14.3288C10.4346 14.8811 10.8823 15.3288 11.4346 15.3288H12.5332C13.0855 15.3288 13.5332 15.7765 13.5332 16.3288V17.5089C13.5332 18.0612 13.9809 18.5089 14.5332 18.5089H15.7133C16.2656 18.5089 16.7133 18.0612 16.7133 17.5089V16.3288C16.7133 15.7765 17.161 15.3288 17.7133 15.3288H19.0565C19.6088 15.3288 20.0565 14.8811 20.0565 14.3288V13.2302C20.0565 12.6779 19.6088 12.2302 19.0565 12.2302H17.7133C17.161 12.2302 16.7133 11.7825 16.7133 11.2302V9.80542C16.7133 9.25314 16.2656 8.80542 15.7133 8.80542H14.5332C13.9809 8.80542 13.5332 9.25314 13.5332 9.80542Z" fill="#F5F5F5"/>
          <path d="M2.77441 2.12009V0.896963C2.77441 0.401584 3.176 0 3.67138 0C4.16676 0 4.56834 0.401583 4.56834 0.896962V2.12009C4.56834 2.61547 4.16676 3.01706 3.67138 3.01706C3.176 3.01706 2.77441 2.61547 2.77441 2.12009Z" fill="#3C5AAA"/>
          <path d="M14.3555 2.12009V0.896963C14.3555 0.401584 14.7571 0 15.2524 0C15.7478 0 16.1494 0.401583 16.1494 0.896962V2.12009C16.1494 2.61547 15.7478 3.01706 15.2524 3.01706C14.7571 3.01706 14.3555 2.61547 14.3555 2.12009Z" fill="#3C5AAA"/>
        </svg>
        <span>دریافت نوبت</span>
      </div>
      <div @click="shareTel" class="doctor-tab">
        <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.17607 4.46951L6.34689 7.5917C6.44452 7.85206 6.42934 8.14132 6.30498 8.39003L5.47868 10.0426C5.17963 10.6407 5.19928 11.3487 5.53105 11.9293L6.19458 13.0905C6.72723 14.0227 7.42236 14.852 8.24711 15.5393L8.62595 15.855C9.47247 16.5604 10.6376 16.745 11.6607 16.3357L12.0455 16.1818C12.33 16.068 12.6523 16.1016 12.9073 16.2715L15.7689 18.1793C16.4375 18.625 16.5944 19.5408 16.1123 20.1836L16.0032 20.3291C15.6741 20.7679 15.2306 21.1077 14.7213 21.3115C13.6099 21.756 12.3768 21.7923 11.2412 21.4137L10.302 21.1007C10.1018 21.0339 9.91267 20.9376 9.74092 20.8149L7.97434 19.5531C6.99548 18.8539 6.1102 18.0322 5.3401 17.1081C4.44896 16.0387 3.66752 14.8825 3.00756 13.6569L2.25 12.25L1.94588 11.5809C1.32252 10.2095 1 8.72059 1 7.21419C1 6.43676 1.30883 5.69117 1.85856 5.14144L2 5C2.64029 4.35971 3.50871 4 4.41421 4H4.49856C4.80018 4 5.07016 4.1871 5.17607 4.46951Z" fill="#0A1E88" stroke="#0A1E88"/>
          <path d="M10.084 7.24377L10.4825 7.43503C12.1532 8.23684 13.2616 9.87745 13.3818 11.7267V11.7267" stroke="#0A1E88"/>
          <path d="M11.3721 4.07764L12.0026 4.45876C14.6458 6.05653 16.2217 8.95577 16.125 12.0429V12.0429" stroke="#0A1E88"/>
          <path d="M13.6943 1L14.5041 1.63881C17.8991 4.31686 19.5856 8.61782 18.9158 12.8897V12.8897" stroke="#0A1E88"/>
        </svg>
        <span>آدرس و تلفن</span>
      </div>
      <div @click="shareLink" class="doctor-tab">
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11.5" cy="11.5" r="11.5" fill="#0A1E88"/>
          <circle cx="8.33672" cy="6.0374" r="1.5125" fill="white" stroke="white"/>
          <circle cx="8.33672" cy="17.5374" r="1.5125" fill="white" stroke="white"/>
          <circle cx="18.1121" cy="11.7874" r="1.5125" fill="white" stroke="white"/>
          <path d="M9.19922 6.61182L18.1117 11.7868" stroke="white"/>
          <path d="M8.62891 17.5374L18.1164 12.075" stroke="white"/>
        </svg>
        <span>اشتراک گذاری</span>
      </div>
    </div>
    <div class="doctor-tabs" v-if="showTel">
      <div @click="showLocation" class="doctor-tab full-width px-4">
        <div class="full-width d-flex" style="flex-direction: column; justify-content: flex-start; align-items: flex-start">
          <span class="full-width  mb-4">آدرس: {{ doctor.organization.address ?? '-' }}</span>
          <a :href="`tel:${doctor.organization?.phone}`" class="full-width" style="font-size: 15px;display: flex; color: black">تلفن: {{ doctor.organization?.phone ?? '-' }}</a>
        </div>
      </div>
    </div>
    <div class="doctor-profile-bottom pb-8">
      <nuxt-link :to="`/doctors/${id}/samples`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-4">
        <DoctorProfileLinkSurgeriesImage />
        <div class="doctor-profile-link-title">
          {{ getProfessionCat }}
        </div>
      </nuxt-link>
      <nuxt-link :to="`/doctors/${id}/comments`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-4">
        <DoctorProfileLinkCommentsImage />
        <div class="doctor-profile-link-title">
          نظر سایر مراجعه کنندگان
        </div>
      </nuxt-link>
      <nuxt-link :to="`/doctors/${id}/faqs`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-4">
        <DoctorProfileLinkQuestionsImage />
        <div class="doctor-profile-link-title">
          پرسش های متداول
        </div>
      </nuxt-link>
      <nuxt-link @click="goToOwnReservePage" class="doctor-profile-link d-flex flex-row align-center justify-start mb-4">
        <DoctorProfileLinkReservesImage />
        <div class="doctor-profile-link-title">
          وقت های رزو شده من از پزشک
        </div>
      </nuxt-link>
      <nuxt-link :to="`/doctors/${id}/insurances`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-4">
        <DoctorProfileLinkBimeImage />
        <div class="doctor-profile-link-title">
          بیمه های طرف قرارداد
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import LikeButton from "~/components/action/LikeButton.vue";
import DoctorProfileLinkReservesImage from "~/components/doctor/DoctorProfileLinkReservesImage.vue";
import DoctorProfileLinkSurgeriesImage from "~/components/doctor/DoctorProfileLinkSurgeriesImage.vue";
import DoctorProfileLinkCommentsImage from "~/components/doctor/DoctorProfileLinkCommentsImage.vue";
import DoctorProfileLinkQuestionsImage from "~/components/doctor/DoctorProfileLinkQuestionsImage.vue";
const router = useRouter()
const auth = useAuthStore()
const route = useRoute()
const app = useNuxtApp()
const id = route.params.id

const loading = ref(true)
const showLocation = ref(false)
const showTel = ref(false)

const doctor = ref({
  id: 0,
  fname: '',
  lname: '',
  full_name: '',
  address: '',
  logo: '/images/doctors/doctor.png',
  point: 0,
  rate: 0,
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

const onLikeClicked = async() => {
  const {$postRequest: postRequest}=app
  await postRequest(`/doctors/${id}/like`)
  doctor.value.liked = !doctor.value.liked
}

const goToReservePage = async() => {
  if (auth.user) {
    await router.push(`/doctors/${doctor.value.id}/reserve`)
  } else {
    auth.openLoginModal()
  }
}

const goToOwnReservePage = async() => {
  if (auth.user) {
    await router.push(`/doctors/${doctor.value.id}/reserves`)
  } else {
    auth.openLoginModal()
  }
}

const getDoctor = async () => {
  loading.value = true
  const {$getRequest: getRequest}=app
  const {data: d} = await getRequest(`/doctors/${id}`)
  doctor.value = {
    ...d,
    logo: d.logo || '/images/doctors/doctor.png'
  }
  const dC = useCookie('profession_id')
  const own_id = useCookie('own_id')
  dC.value = d.organization.profession_id
  own_id.value = d.organization.id
  loading.value = false
}

const copyText = (text: string = '') => {
  navigator.clipboard.writeText(text)
}

const shareLink = async () => {
  const url = window.location.href

  const shareData = {
    title: doctor.value.full_name,
    text: 'اشتراک گذاری با دوستان',
    url: url,
  };
  try {
    await navigator.share(shareData);
    app.$toast.info('با موفقیت کپی شد', {
      autoClose: 2000,
    });
  } catch (e) {
    console.error(e);
  }
}
const shareTel = async () => {
  showTel.value = !showTel.value
}
const shareAddress = () => {
  showLocation.value = !showLocation.value
}

const getProfessionCat = computed(() => {
  if (doctor.value.organization.profession.id == 5) {
    return 'نمونه ارتودنسی های انجام شده'
  }
  return 'نمونه جراحی های انجام شده'
})

onMounted(() => {
  nextTick(() => {
    getDoctor()
  })
})
</script>

<style scoped lang="scss">

</style>