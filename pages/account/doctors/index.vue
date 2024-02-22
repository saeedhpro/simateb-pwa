<template>
  <div class="account-page search-page relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <SearchBox class="mt-16"/>
    <CustomAutocomplete :items="professionList" @select="onProfessionSelect" class="mt-6" />
    <div class="mt-4 full-width">
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
const professionList = ref([])

const router = useRouter()
const onBackClicked = () => {
  router.go(-1)
}

const getDoctors = async() => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: categories, meta: meta} = await getRequest(`/doctors?page=${page.value}&limit=${limit.value}`)
  list.value = categories ?? []
  page.value = meta.current_page
  last_page.value = meta.last_page
}

const getProfessionList = async() => {
  const {$getRequest: getRequest}=useNuxtApp()
  const {data: categories, meta: meta} = await getRequest(`/professions`)
  professionList.value = categories ?? []
}

const onProfessionSelect = (p) => {
  console.log(p, "p")
}


const paginate = () => {
  page.value += 1
  getDoctors()
}

getDoctors()
getProfessionList()
</script>

<style scoped lang="scss">

</style>