<template>
  <div v-if="loading" class="profile-page relative d-flex flex-column align-center justify-center h-full">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="doctor-profile own comments-page pt-8 relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="comments-page-bottom full-width mt-8">
      <div class="comments-list-box full-width"
           style="min-height: calc(100vh - 100px) !important;"
      >
        <div
            v-for="(c, i) in comments"
            :key="i"
            class="comment-item pb-4 border-b-md mb-8 full-width d-flex flex-column align-start justify-start">
          <div class="d-flex flex-row align-center justify-start">
            <v-avatar v-if="c.commentable && c.commentable.logo" size="x-large">
              <v-img
                  :src="c.commentable.logo"
              ></v-img>
            </v-avatar>

            <v-avatar v-else color="blue" size="x-large">
              <span class="text-h5">{{ `${c.commentable?.fname?.charAt(0)} ${c.commentable?.lname?.charAt(0)}` }}</span>
            </v-avatar>

            <div class="comment-user-name mr-4">{{ c.commentable?.full_name }}</div>
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
        </div>
        <div class="d-flex justify-center align-center py-16 full-width" v-if="commentsLoading">
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

definePageMeta({
  middleware: 'auth'
})

import BackButton from "~/components/action/BackButton.vue";
import CommentRateItem from "~/components/doctor/CommentRateItem.vue";
import LikeUpComponent from "~/components/images/LikeUpComponent.vue";
import LikeDownComponent from "~/components/images/LikeDownComponent.vue";
const router = useRouter()
const route = useRoute()

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
  getComments()
}

getComments()
loading.value = false
</script>

<style scoped lang="scss">

</style>