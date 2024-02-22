<template>
  <div class="main-doctor-list full-width">
    <div class="main-doctor-list-header d-flex flex-row align-center justify-space-between full-width pb-2 mt-6 px-1 px-sm-2 px-md-8 px-lg-16">
      <div class="title pointer">
        معرفی پزشکان
      </div>
      <nuxt-link
        to="/account/doctors"
        class="more-link"
      >
        مشاهده بیشتر
      </nuxt-link>
    </div>
    <div class="main-doctor-list-content d-flex flex-row align-center justify-space-between full-width pb-2 mt-6 px-1 px-sm-2">
      <v-slide-group :show-arrows="!onMobile" >
        <v-slide-group-item
          v-for="(d, i) in list"
          :key="i"
          v-slot="{ isSelected, toggle }"
        >
          <DoctorListItem
            :doctor="d"
            :class="{'desktop': !onMobile}"
          />
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$getRequest: getRequest}=useNuxtApp()
const {data: doctors} = await getRequest('/doctors?page=1&limit=6')
const list = doctors ?? []
// const {data: doctors} = await useFetch('/api/doctors')
// const list = doctors.value?.data ?? []

const {$isMobile: isMobile} = useNuxtApp()
const onMobile = computed(() => isMobile())
</script>

<style scoped lang="scss">
</style>