<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-center h-full">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="doctor-profile comments-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="comments-page-top-box mt-8 px-8 full-width d-flex flex-column align-start justify-start">
      <div class="comments-page-title text-right full-width">
          <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2911_71)">
            <path d="M26.7149 1H9.11824C8.50474 1 7.90277 1.16674 7.3767 1.48238C6.87936 1.78078 6.46704 2.20197 6.17928 2.70554L5.99818 3.02246C5.58533 3.74497 5.36816 4.5627 5.36816 5.39485V16.1293C5.36816 17.4543 5.85863 18.7325 6.74503 19.7174L7.47448 20.5279C7.9278 21.0315 8.55754 21.3415 9.23319 21.3935L10.8276 21.5161C11.5767 21.5737 12.1031 22.2786 11.9457 23.0132C11.7123 24.1022 12.9206 24.9234 13.8472 24.3056L17.9843 21.5476C18.5199 21.1905 19.1492 21 19.7929 21H26.8548C27.7037 21 28.5179 20.6628 29.1182 20.0625C29.7184 19.4622 30.0557 18.6481 30.0557 17.7992V5.04912C30.0557 4.43939 29.9318 3.83603 29.6916 3.2756L29.5048 2.8396C29.2534 2.25315 28.8237 1.76081 28.2766 1.43254C27.8048 1.14951 27.2651 1 26.7149 1Z" fill="#0A1E88" stroke="#0A1E88"/>
            <circle cx="11.3057" cy="11.3126" r="2.1875" fill="white"/>
            <circle cx="17.5518" cy="11.3126" r="2.1875" fill="white"/>
            <circle cx="23.8066" cy="11.3126" r="2.1875" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_d_2911_71" x="0.868164" y="0.5" width="33.6875" height="32.5196" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.854667 0 0 0 0 0.861901 0 0 0 0 0.975833 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2911_71"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2911_71" result="shape"/>
            </filter>
            </defs>
            </svg>
        نظرات در مورد <span>{{ doctor.full_name }}</span>
      </div>
      <div class="comments-rating-box mt-8">
        <CommentRateItem
          title="برخورد مناسب پزشک"
          :rate="rates.behavior"
        />
        <CommentRateItem
          title="توضیح پزشک در هنگام ویزیت"
          :rate="rates.explanation"
        />
        <CommentRateItem
          title="مهارت و تخصص پزشک"
          :rate="rates.skill"
        />
      </div>
      <div class="comment-share-box mt-8 px-4 full-width d-flex flex-row align-center justify-space-between">
        <div class="comment-share-title">نظر خود را به اشتراک بگذارید:</div>
        <nuxt-link @click="goToCommentPage" class="comment-share-link">
          ثبت نظر
        </nuxt-link>
      </div>
      <div class="comment-share-box mt-8 px-4 full-width">
        <v-autocomplete
            label=""
            :items="commentFilterList"
            variant="outlined"
            @change="onCommentFilter"
            v-model="commentFilter"
            bg-color="#fff"
            search="name"
            custom-filter="name"
            item-title="name"
            item-value="id"
            :return-object="true"
            auto-select-first
            density="comfortable"
            theme="light"
        ></v-autocomplete>
      </div>
    </div>
    <div class="comments-page-bottom full-width">
      <div class="comments-list-box full-width">
        <CommentItem
            v-for="(c, i) in comments"
            :key="i"
            :comment="c"
        />
        <div class="d-flex justify-center align-center py-16 full-width" v-if="commentsLoading">
          <LoadingComponent color="#9AC8EA"/>
        </div>
        <div v-if="lastPage > page" @click="loadMoreComments" class="more-button mb-4">مشاهده بیشتر</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import CommentItem from "~/components/doctor/CommentItem.vue";

import BackButton from "~/components/action/BackButton.vue";
import CommentRateItem from "~/components/doctor/CommentRateItem.vue";
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const id = route.params.id

const commentFilterList = ref(
    [
      {
        id: 'created_at',
        name: 'آخرین نظرات'
      },
      {
        id: 'like',
        name: 'محبوب ترین نظرات'
      },
    ]
)

const commentFilter = ref({
  id: 'created_at',
  name: 'آخرین نظرات'
})

const page = ref(1)
const lastPage = ref(1)
const comments = ref([])
const limit = ref(10)
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
const rates = ref({
  behavior: 0,
  explanation: 0,
  skill: 0
})

const loading = ref(true)
const commentsLoading = ref(true)

const onBackClicked = () => {
  router.go(-1)
}

const getDoctorComments = async () => {
  commentsLoading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const res = await getRequest(`/doctors/${id}/comments?page=${page.value}&limit=${limit.value}`)
  lastPage.value = res.meta.last_page
  const data = res.data
  comments.value.push(
      ...data,
  )
  commentsLoading.value = false
}

const getDoctorCommentRates = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const res = await getRequest(`/doctors/${id}/comments/rates`)
  rates.value.explanation = res.explanation_rate
  rates.value.behavior = res.treat_rate
  rates.value.skill = res.skill_rate
}

const getDoctor = async () => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: d} = await getRequest(`/doctors/${id}`)
  doctor.value = {
    ...d,
    logo: d.logo || '/images/doctors/doctor.png'
  }
}

const onCommentFilter = (filter) => {
  commentFilter.value = filter
}

const loadMoreComments = () => {
  page.value += 1
  getDoctorComments()
}

const goToCommentPage = () => {
  if (auth.user) {
    router.push(`/doctors/${id}/comments/create`)
  } else {
    auth.openLoginModal()
  }
}

getDoctor()
getDoctorComments()
getDoctorCommentRates()
loading.value = false
</script>

<style scoped lang="scss">

</style>