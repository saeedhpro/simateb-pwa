<template>
  <nuxt-link :to="`/account/doctors/${doctor.id}`" class="doctor-list-item d-flex flex-column justify-end">
    <div class="doctor-list-item-content relative d-flex flex-row align-start justify-start mx-2 mx-sm-2 mx-md-1 mx-lg-0">
      <div class="image-box">
        <img alt="" :src="doctor.logo" />
      </div>
      <div class="mt-3 text-right full-width doctor-list-item-details d-flex flex-column align-start justify-start">
        <div class="doctor-name">
          {{ doctor.full_name }}
        </div>
        <div class="doctor-profession-name mt-2">
          {{ doctor.profession?.name }}
        </div>
        <div class="doctor-starts mt-3 ltr">
          <v-rating
              half-increments
              :hover="true"
              :length="5"
              :size="20"
              :readonly="true"
              :model-value="doctor?.stars"
              color="warning"
              active-color="warning"
          />
        </div>
      </div>
      <div @click="goToPage" class="more-button">معرفی</div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  doctor: {
    type: Object,
    default: {
      id: 0,
      full_name: '',
      profession: {
        id: 1,
        name: '',
      },
      logo: '',
    },
    required: true,
  }
})

const router = useRouter()
const goToPage = () => {
  router.push(`/account/doctors/${props.doctor.id}`)
}
</script>

<style scoped lang="scss">

</style>