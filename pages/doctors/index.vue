<template>
  <div class="account-page search-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <SearchBox :term="term" @search="doSearch" class="mt-16"/>
    <CustomAutocomplete :items="professionList" @select="onProfessionSelect" class="mt-6" />
    <div v-if="loading" class="mt-8 full-width relative d-flex flex-column align-center justify-start">
      <LoadingComponent />
    </div>
    <div v-else class="mt-4 full-width">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          v-for="(d, i) in list"
          :key="i"
        >
          <DoctorListItem
            class="full-width"
            :doctor="d"
          />
        </v-col>
      </v-row>
      <div v-if="last_page > page" @click="paginate" class="more-button mt-6">مشاهده بیشتر</div>
      <div v-if="list.length == 0">
        <v-img src="/images/not_found.png" alt="" width="80%" class="mx-auto"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import CustomAutocomplete from "~/components/input/CustomAutocomplete.vue";
const page = ref(1)
const last_page = ref(1)
const limit = ref(12)
const list = ref([])
const professions = ref<Array<Number>>([])
const professionList = ref([])
const loading = ref(false)
const q = ref<string>('')
const term = ref<string>('')
const auth = useAuthStore()

const router = useRouter()
const route = useRoute()
const onBackClicked = () => {
  router.go(-1)
}
const getDoctors = async() => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const dC = useCookie('profession_id')
  const own_id = useCookie('own_id')
  let url = `/doctors?professions=${professions.value.join(',')}&page=${page.value}&limit=${limit.value}&q=${q.value}`
  if (dC.value && own_id.value) {
    url += `&profession_id=${dC.value}&own=${own_id.value}`
  }
  const {data: categories, meta: meta} = await getRequest(url)
  list.value = categories ?? []
  page.value = meta.current_page
  last_page.value = meta.last_page
  setTimeout(() => {
    loading.value = false
  }, 200)
}

const getProfessionList = async() => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: categories, meta: meta} = await getRequest(`/professions`)
  professionList.value = categories ?? []
}

const onProfessionSelect = (p) => {
  if (p) {
    professions.value = [
      p.id,
    ]
  } else {
    professions.value = []
  }
  getDoctors()
}


const paginate = () => {
  page.value += 1
  getDoctors()
}

const doSearch = (term: string) => {
  q.value = term
  getDoctors()
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
    getDoctors()
    getProfessionList()
  })
})
</script>

<style scoped lang="scss">

</style>