<template>
  <div class="account-page search-page pt-4 mb-10 px-4 relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <SearchBox :term="term" @search="doSearch" class="mt-16 "/>
    <div v-if="loading" class="mt-8 px-4 full-width relative d-flex flex-column align-center justify-start">
      <LoadingComponent />
    </div>
    <div v-else class="mt-4 full-width">
      <v-row>
        <v-col
          cols="12"
          v-for="(d, i) in doctor_list"
          :key="i"
        >
          <nuxt-link :to="`/doctors/${d.id}`" class="doctor-search-item d-flex flex-row align-center justify-start">
            <v-avatar :image="d.logo ? d.logo : '/user_profile.png'" size="40"></v-avatar>
            <div class="mr-4 user-full-name">
              <span>دکتر </span>
              <span class="mx-2 title">{{ d.full_name }} <span></span></span>
              <span>در پزشکان</span>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          v-for="(a, i) in article_list"
          :key="i"
        >
          <nuxt-link :to="`/blog/${a.id}`" class="doctor-search-item d-flex flex-row align-center justify-start">
            <v-avatar :image="a.thumbnail ? a.thumbnail : ''" size="40"></v-avatar>
            <div class="mr-4 user-full-name">
              <span>مقاله </span>
              <span class="mx-2 title">{{ a.title }} <span></span></span>
              <span>در مقالات وبلاگ</span>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          v-for="(a, i) in post_list"
          :key="i"
        >
          <nuxt-link :to="`/blog/${a.id}`"  class="doctor-search-item d-flex flex-row align-center justify-start">
            <v-avatar :image="a.thumbnail ? a.thumbnail : ''" size="40"></v-avatar>
            <div class="mr-4 user-full-name">
              <span>مقاله </span>
              <span class="mx-2 title">{{ a.title }} <span></span></span>
              <span>در مقالات ثابت</span>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
<!--      <div v-if="last_page > page" @click="paginate" class="more-button mt-6">مشاهده بیشتر</div>-->
<!--      <div v-if="doctor_list.length == 0">-->
<!--        <v-img src="/images/not_found.png" alt="" width="80%" class="mx-auto"/>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import CustomAutocomplete from "~/components/input/CustomAutocomplete.vue";
const page = ref(1)
const last_page = ref(1)
const limit = ref(4)
const doctor_list = ref([])
const article_list = ref([])
const post_list = ref([])
const loading = ref(false)
const q = ref<string>('')
const term = ref<string>('')
const auth = useAuthStore()

const router = useRouter()
const route = useRoute()
const onBackClicked = () => {
  router.go(-1)
}
const search = async() => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const own_id = useCookie('own_id')
  let url = `/search?page=${page.value}&limit=${limit.value}&q=${q.value}`
  const res = await getRequest(url)
  doctor_list.value = res.doctors ?? []
  article_list.value = res.articles ?? []
  post_list.value = res.posts ?? []
  setTimeout(() => {
    loading.value = false
  }, 200)
}

const paginate = () => {
  page.value += 1
  search()
}

const doSearch = (term: string) => {
  q.value = term
  let query = {
    term: term
  }
  router.push({
    path: '/search',
    query: query
  })
  search()
}

onMounted(() => {
  nextTick(() => {
    if (route.query.term) {
      term.value = route.query.term.toString()
      q.value = route.query.term.toString()
    }
    if (!term.value) {
      term.value = auth.searchTerm
      q.value = auth.searchTerm
    }
    search()
  })
})
</script>

<style scoped lang="scss">

</style>