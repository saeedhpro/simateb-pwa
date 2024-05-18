<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-center h-full">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="doctor-profile comments-page pt-8 relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="comments-page-top-box mt-16 px-8 full-width d-flex flex-column align-start justify-start">
      <div class="comments-page-title text-right full-width">
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
        <nuxt-link :to="`/account/doctors/${id}/comments/create`" class="comment-share-link">
          ثبت نظر
        </nuxt-link>
      </div>
      <div class="comment-share-box mt-8 px-4 full-width">
        <v-autocomplete
            label=""
            :items="commentFilterList"
            variant="solo"
            @change="onCommentFilter"
            v-model="commentFilter"
            rounded
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

definePageMeta({
  middleware: 'auth'
})

import BackButton from "~/components/action/BackButton.vue";
import CommentRateItem from "~/components/doctor/CommentRateItem.vue";
import LikeUpComponent from "~/components/images/LikeUpComponent.vue";
import LikeDownComponent from "~/components/images/LikeDownComponent.vue";
const router = useRouter()
const route = useRoute()
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

getDoctor()
getDoctorComments()
getDoctorCommentRates()
loading.value = false
</script>

<style scoped lang="scss">

</style>