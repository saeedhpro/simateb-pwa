<template>
  <div class="reserve-page own relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="reserve-page-content px-8 pt-4 full-width">
      <div class="d-flex flex-row align-center justify-start">
        <v-avatar :image="user.logo ? user.logo : '/user_profile.png'" size="40"></v-avatar>
        <div class="mr-4 user-full-name">{{ user.full_name }}</div>
      </div>
      <div class="full-width my-8">
        <div class="reserve-header mb-8">نظرات من</div>
        <div
            v-for="(c, i) in comments"
            :key="i"
            class="own-reserve-item mt-8 d-flex flex-column align-start justify-start"
        >
          <div class="doctor-details d-flex flex-row align-center justify-start full-width mb-8">
            <v-avatar color="#D9D9D9" v-if="c.commentable && c.commentable.logo" :image="c.commentable.logo" size="52"></v-avatar>
            <v-avatar v-else color="blue" size="x-large">
              <span class="text-h5">{{ `${c.commentable?.fname?.charAt(0)} ${c.commentable?.lname?.charAt(0)}` }}</span>
            </v-avatar>
            <div class="d-flex flex-column align-start justify-start full-width pr-4">
              <div class="doctor-full-name mb-2">
                {{ c.commentable?.full_name }}
              </div>
            </div>
          </div>
          <div class="comment-details full-width">
            <div class="comment-detail" v-if="c.do_yo_share">
              <LikeUpComponent class="ml-2" />
              <span class="green">پزشک را توصیه می کنم</span>
            </div>
            <div class="comment-detail" v-else>
              <LikeDownComponent class="ml-2" />
              <span class="red">پزشک را توصیه نمی کنم</span>
            </div>
            <div class="comment-detail mt-2">
              نظر :
            </div>
            <div class="comment-detail">
              <p>{{ c.description }}</p>
            </div>
          </div>
        </div>
        <div v-if="loading" class="profile-page mt-4 h-100vh relative d-flex flex-column align-center justify-center">
          <LoadingComponent color="#9AC8EA"/>
        </div>
        <div v-if="!commentsLoading && lastPage > page" @click="loadMoreComments" class="more-button mb-4">مشاهده بیشتر</div>
        <div v-if="!commentsLoading && comments.length == 0">
          <v-img src="/images/not_found.png" alt="" width="100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";

definePageMeta({
  middleware: 'auth'
})
import LikeUpComponent from "~/components/images/LikeUpComponent.vue";
import LikeDownComponent from "~/components/images/LikeDownComponent.vue";
const auth = useAuthStore();
const user = ref(auth.user)
const router = useRouter()
const route = useRoute()
const page = ref(1)
const lastPage = ref(1)
const comments = ref([])
const limit = ref(10)

const loading = ref(true)
const commentsLoading = ref(true)

const onBackClicked = () => {
  router.go(-1)
}

const getComments = async () => {
  commentsLoading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const res = await getRequest(`/comments?page=${page.value}&limit=${limit.value}`)
  lastPage.value = res.meta.last_page
  comments.value.push(
      ...res.data,
  )
  commentsLoading.value = false
}
const loadMoreComments = () => {
  page.value += 1
  getComments()
}

getComments()
loading.value = false
</script>

<style scoped lang="scss">

</style>