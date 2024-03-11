<template>
  <div v-if="loading" class="profile-page h-100vh relative d-flex flex-column align-center justify-center">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="doctor-profile relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <LikeButton
        :liked="doctor.liked"
        @click="onLikeClicked"
    />
    <div class="doctor-profile-top">
      <div class="doctor-image-box mt-16">
        <div class="bg"></div>
        <img :src="doctor.logo" alt="" >
      </div>
      <div class="doctor-details-box">
        <div class="doctor-details-top-box">
          <div class="container full-width">
            <v-row>
              <v-col cols="12" sm="6">
                <div class="d-flex flex-row align-center justify-space-between justify-sm-start">
                  <div @click="shareAddress" class="doctor-detail-icon-box me-4">
                    <i class="fa-light fa-location-dot fa-2xl" style="color: #504f4f;"></i>
                  </div>
                  <div @click="shareLink" class="doctor-detail-icon-box me-4">
                    <i class="fa-light fa-share-nodes fa-2xl" style="color: #504f4f;"></i>
                  </div>
                  <a class="doctor-detail-icon-box me-4" :href="`tel:${doctor.tel}`">
                    <i class="fa-light fa-phone fa-2xl" style="color: #504f4f;"></i>
                  </a>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <ButtonsMainActionButton
                    @click="goToReservePage"
                    title="دریافت نوبت" class="full-width big" height="65px"/>
              </v-col>
            </v-row>
          </div>
        </div>

        <div class="doctor-details-bottom-box">
          <div class="container full-width">
            <div class="d-flex flex-row align-center justify-space-between">
              <div class="doctor-details-bottom-item d-flex flex-row align-center justify-center">
                <div class="icon-box">
                  <i class="fa-light fa-clock-rotate-left fa-2xl" style="color: #000000;"></i>
                </div>
                <div class="details-box">
                  <div class="detail-top">
                    7 سال
                  </div>
                  <div class="detail-bottom">
                    سابقه
                  </div>
                </div>
              </div>
              <div class="doctor-details-bottom-item d-flex flex-row align-center justify-center">
                <div class="icon-box">
                  <i class="fa-light fa-users-medical fa-2xl" style="color: #000000;"></i>
                </div>
                <div class="details-box">
                  <div class="detail-top">
                    +2.6K
                  </div>
                  <div class="detail-bottom">
                    بیمار
                  </div>
                </div>
              </div>
              <div class="doctor-details-bottom-item d-flex flex-row align-center justify-center">
                <div class="icon-box">
                  <i class="fa-regular fa-comment-dots fa-2xl" style="color: #000000;"></i>
                </div>
                <div class="details-box">
                  <div class="detail-top">
                    +2.6K
                  </div>
                  <div class="detail-bottom">
                    نظرات
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="doctor-profile-bottom py-8">
      <nuxt-link :to="`/account/doctors/${id}/reserves`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-8">
        <DoctorProfileLinkReservesImage />
        <div class="doctor-profile-link-title">
          وقت های رزو شده من از پزشک
        </div>
      </nuxt-link>
      <nuxt-link :to="`/account/doctors/${id}/samples`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-8">
        <DoctorProfileLinkSurgeriesImage />
        <div class="doctor-profile-link-title">
          نمونه جراحی های انجام شده
        </div>
      </nuxt-link>
      <nuxt-link :to="`/account/doctors/${id}/comments`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-8">
        <DoctorProfileLinkCommentsImage />
        <div class="doctor-profile-link-title">
          نظر سایر مراجعه کنندگان
        </div>
      </nuxt-link>
      <nuxt-link :to="`/account/doctors/${id}/faqs`" class="doctor-profile-link d-flex flex-row align-center justify-start mb-8">
        <DoctorProfileLinkQuestionsImage />
        <div class="doctor-profile-link-title">
          پرسش های متداول
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
// import {useToast} from "vue-toastification";
const router = useRouter()
const route = useRoute()
// const toast = useToast()

const id = route.params.id

definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)

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

const onLikeClicked = async() => {
  const {$postRequest: postRequest}=useNuxtApp()
  await postRequest(`/doctors/${id}/like`)
  doctor.value.liked = !doctor.value.liked
}

const goToReservePage = async() => {
  router.push(`/account/doctors/${doctor.value.id}/reserve`)
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
  } catch (e) {
    console.error(e);
  }
}
const shareTel = async () => {
  const shareData = {
    title: doctor.value.full_name,
    text: 'اشتراک گذاری با دوستان',
    url: doctor.value.tel,
  };
  try {
    await navigator.share(shareData);
  } catch (e) {
    console.error(e);
  }
  // copyText(doctor.value.tel)
  // toast.success('با موفقیت کپی شد')
}
const shareAddress = () => {
  copyText(doctor.value.address)
  // toast.success('با موفقیت کپی شد')
}

getDoctor()
</script>

<style scoped lang="scss">

</style>