<template>
  <div class="document-page own relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="document-page-content px-8 pt-4 full-width">
      <div class="d-flex flex-row align-center justify-start">
        <v-avatar :image="user.logo" size="52"></v-avatar>
        <div class="mr-4 user-full-name">{{ user.full_name }}</div>
      </div>
      <div class="full-width my-8">
        <div class="document-header mb-8">اسناد من</div>
        <div
            v-for="(d, i) in list.data"
            :key="i"
            class="own-document-item mt-8 d-flex flex-column align-start justify-start"
        >
          <div class="own-document-item-header mb-4">
            <span>{{ d.organization ? d.organization.name : 'مطب دکتر نجفیان' }}</span>
            <span class="own-document-item-date">{{ d.created_at_fa ? d.created_at_fa : '' }}</span>
          </div>
          <div class="own-document-item-content full-width d-flex flex-row align-start justify-start">
            <div class="">
              <a v-if="d.ext === 'pdf'" class="file-image" :href="d.url" target="_blank">
                <img src="/images/pdf.svg" alt="" style="max-height: 160px">
              </a>
              <img v-else :src="d.url" alt="" style="height: 160px; width: 160px;">
            </div>
            <div class="full-width mr-4">
              <span class="border-b-md">نظر پزشک:</span>
              <div class="font-weight-bold full-width mt-4">{{ d.comment }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="profile-page mt-4 h-100vh relative d-flex flex-column align-center justify-center">
        <LoadingComponent color="#9AC8EA"/>
      </div>
      <div v-if="!loading && list.meta.last_page > page" @click="paginate(page + 1)" class="more-button mt-6">مشاهده بیشتر</div>
      <div v-if="!loading && list.data.length == 0">
        <v-img src="/images/not_found.png" alt="" width="100%"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";

definePageMeta({
  middleware: 'auth'
})
const auth = useAuthStore();
const user = ref(auth.user)
const router = useRouter()
const route = useRoute()

const page = ref(1)
const limit = ref(2)
const loading = ref(true)
const list = ref({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1
  }
})

const getDocuments = async () => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: data, meta: meta} = await getRequest(`/documents?page=${page.value}&limit=${limit.value}`)
  list.value.data = [
      ...list.value.data,
      ...data,
  ]
  list.value.meta = {
    ...meta
  }
  loading.value = false
}
const onBackClicked = () => {
  router.go(-1)
}
const paginate = (p = 1) => {
  page.value = p
  getDocuments()
}

paginate()
</script>

<style scoped lang="scss">

</style>