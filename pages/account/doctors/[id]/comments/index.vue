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
        <div
            v-for="(c, i) in comments"
            :key="i"
            class="comment-item mb-8 full-width d-flex flex-column align-start justify-start">
          <div class="d-flex flex-row align-center justify-start">
            <v-avatar v-if="c.user && c.user.logo" size="x-large">
              <v-img
                  :src="c.user.logo"
              ></v-img>
            </v-avatar>

            <v-avatar v-else color="blue" size="x-large">
              <span class="text-h5">{{ `${c.user.fname?.charAt(0)} ${c.user.lname?.charAt(0)}` }}</span>
            </v-avatar>

            <div class="comment-user-name mr-4">{{ c.user?.full_name }}</div>
          </div>
          <div class="comment-do-share-box mt-4 full-width d-flex flex-row align-center justify-start"  v-if="c.do_yo_share">
            <span class="green">پزشک را توصیه می کنم</span>
            <LikeUpComponent class="mr-2" />
          </div>
          <div class="comment-do-share-box mt-4 full-width d-flex flex-row align-center justify-start"  v-else>
            <span class="red">پزشک را توصیه نمی کنم</span>
            <LikeDownComponent class="mr-2" />
          </div>
          <div class="comment-body mt-4 full-width">
            <p>{{ c.description }}</p>
          </div>
          <div class="comment-like-box mt-4 full-width d-flex flex-row align-center justify-end">
            <span @click="likeComment(c.id)" v-if="c.liked">
              <i  class="pointer fa-solid fa-heart fa-2xl" style="color: #fa0000;"></i>
            </span>
            <span @click="likeComment(c.id)" v-else>
            <i class="pointer fa-light fa-heart fa-2xl" style="color: #968B8B;"></i>
            </span>
          </div>
          <div class="comment-reply mt-4 full-width">
            <div class="comment-reply-box">
              <input type="text" maxlength="100" v-model="comment.description" class="comment-reply-input" placeholder="نظر خود را بنویسید . . .">
              <v-btn variant="text" color="#0F69F6">
                ارسال
              </v-btn>
            </div>
          </div>
        </div>
        <div class="d-flex justify-center align-center py-16 full-width" v-if="commentsLoading">
          <LoadingComponent color="#9AC8EA"/>
        </div>
        <div v-if="lastPage > page" @click="loadMoreComments" class="more-button mb-4">مشاهده بیشتر</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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

const comment = ref({
  description: ''
})
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
  behavior: 4.2,
  explanation: 3.2,
  skill: 4.7
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
  comments.value.push(
      ...res.data,
  )
  commentsLoading.value = false
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

const likeComment = (id: Number) => {
  console.log(id, "liked")
  const index = comments.value.findIndex(i => i.id == id)
  if (index > -1) {
    comments.value[index].liked = !comments.value[index].liked
  }
}

const loadMoreComments = () => {
  page.value += 1
  getDoctorComments()
}

getDoctor()
getDoctorComments()
loading.value = false
</script>

<style scoped lang="scss">

</style>