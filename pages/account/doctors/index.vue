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
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import CustomAutocomplete from "~/components/input/CustomAutocomplete.vue";

const {data: doctors} = await useFetch('/api/doctors')
const list = doctors.value?.data ?? []

const {data: professions} = await useFetch('/api/professions')
const professionList = professions.value?.data ?? []

const router = useRouter()
const onBackClicked = () => {
  router.go(-1)
}

const onProfessionSelect = (p) => {
  console.log(p, "p")
}
</script>

<style scoped lang="scss">

</style>