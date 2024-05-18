<template>
  <div
      class="comment-item mb-8 full-width d-flex flex-column align-start justify-start">
    <div class="d-flex flex-row align-center justify-start">
      <v-avatar v-if="comment.user && comment.user.logo" size="x-large">
        <v-img
            :src="comment.user.logo"
        ></v-img>
      </v-avatar>

      <v-avatar v-else color="blue" size="x-large">
        <span class="text-h5">{{ `${comment.user.fname?.charAt(0)} ${comment.user.lname?.charAt(0)}` }}</span>
      </v-avatar>

      <div class="comment-user-name mr-4">{{ comment.user?.full_name }}</div>
    </div>
    <div class="comment-do-share-box mt-4 full-width d-flex flex-row align-center justify-start"  v-if="comment.do_yo_share">
      <span class="green">پزشک را توصیه می کنم</span>
      <LikeUpComponent class="mr-2" />
    </div>
    <div class="comment-do-share-box mt-4 full-width d-flex flex-row align-center justify-start"  v-else>
      <span class="red">پزشک را توصیه نمی کنم</span>
      <LikeDownComponent class="mr-2" />
    </div>
    <div class="comment-body mt-4 full-width">
      <p>{{ comment.description }}</p>
    </div>
    <div class="comment-like-box mt-4 full-width d-flex flex-row align-center justify-end">
            <span @click="likeComment" v-if="comment.liked">
              <i  class="pointer fa-solid fa-heart fa-2xl" style="color: #fa0000;"></i>
            </span>
      <span @click="likeComment" v-else>
            <i class="pointer fa-light fa-heart fa-2xl" style="color: #968B8B;"></i>
            </span>
    </div>
    <div class="comment-reply mt-4 full-width">
      <div class="comment-reply-box">
        <input type="text" maxlength="100" v-model="c.description" class="comment-reply-input" placeholder="نظر خود را بنویسید . . .">
        <v-btn @click="sendComment" variant="text" color="#0F69F6">
          ارسال
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import LikeUpComponent from "~/components/images/LikeUpComponent.vue";
import LikeDownComponent from "~/components/images/LikeDownComponent.vue";

const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const id = route.params.id
const c = ref([])

const likeComment = () => {
  props.comment.liked = !props.comment.liked
}
const sendComment = (parentID: number) => {
  const {$postRequest: postRequest}=useNuxtApp()
  postRequest(`/doctors/${id}/comments`, {
    do_yo_share: false,
    case_type: '',
    result: false,
    result_index: 1,
    result_desc: '',
    description: c.description,
    skill_rate: 0,
    treat_rate: 0,
    parent_id: parentID,
    explanation_rate: 0,
  })
      .then(res => {
        alert('نظر شما با موفقیت ثبت شد')
        c.description = ''
        // toast.success('با موفقیت وارد شدید')
      })
      .catch(err => {
        // toast.error('کد وارد شده صحیح نمی باشد')
      })
}

</script>

<style scoped lang="scss">

</style>