<template>
  <div class="document-page own relative d-flex flex-column align-center justify-start">
    <BackButton
        @click="onBackClicked"
    />
    <div class="document-page-content full-width">
      <div class="d-flex flex-column align-center justify-start account-page-top">
        <div class="profile-title">پروفایل</div>
        <ProfileImage class="mt-4"/>
        <div class="profile-full-name mt-2">{{ user.full_name }}</div>
        <div class="profile-full-name mt-2">{{ user.tel }}</div>
      </div>
      <div class="full-width my-8 px-8">
        <div class="document-header mb-8">
          <v-img height="35" width="35" max-width="35" class="ml-2" src="/images/doc-header.png" alt=""/>
          <div>اسناد پزشکی من</div>
        </div>
        <v-expansion-panels
          color="#F7F9FF"
        >
        <v-expansion-panel
            :title="'فتوگرافی'"
            elevation="0"
            color="#F7F9FF"
            bg-color="#F7F9FF"
            :ripple="false"
            :readonly="true"
        >
          <v-expansion-panel-text>
          <v-expansion-panels
              color="#F7F9FF"
          >
            <v-expansion-panel
                elevation="0"
                color="#F7F9FF"
                bg-color="#F7F9FF"
                :ripple="false"
                :readonly="true"
                v-for="(p,i) in photographies"
                :key="i"
            >
              <v-expansion-panel-title>{{ p.name }}</v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(l, n) in photosList"
                  :key="n"
                  class="full-width"
                >
                  <div class="doc-item-header">
                    <div>کد پذیرش: {{ l.app.code }}</div>
                  </div>
                  <div class="doc-item-body">
                    <v-img width="48%" style="margin: 1%" :src="s" v-for="(s, j) in l.photos" :key="j" @click="openImageModal(l.photos, j)"/>
                  </div>
                </div>
                <div v-if="loadingPhoto" class="profile-page mt-4 h-100vh relative d-flex flex-column align-center justify-center">
                  <LoadingComponent color="#9AC8EA"/>
                </div>
                <div v-if="!loadingPhoto && photosList.length == 0">
                  <v-img src="/images/not_found.png" alt="" width="80%" class="mx-auto mt-16"/>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <div class="full-width" v-if="!loading && photographies.length == 0">
              <v-img src="/images/not_found.png" alt="" width="75%" class="mx-auto"/>
            </div>
          </v-expansion-panels>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
            :title="'رادیولوژی'"
            elevation="0"
            color="#F7F9FF"
            bg-color="#F7F9FF"
            :ripple="false"
            :readonly="true"
        >
          <v-expansion-panel-text>
          <v-expansion-panels
              color="#F7F9FF"
          >
            <v-expansion-panel
                elevation="0"
                color="#F7F9FF"
                bg-color="#F7F9FF"
                :ripple="false"
                :readonly="true"
                v-for="(p,i) in radiologies"
                :key="i"
            >
              <v-expansion-panel-title>{{ p.name }}</v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  v-for="(l, n) in radiosList"
                  :key="n"
                  class="full-width"
                >
                  <div class="doc-item-header">
                    <div>کد پذیرش: {{ l.app.code }}</div>
                  </div>
                  <div class="doc-item-body">
                    <v-img width="48%" :src="s" v-for="(s, j) in l.photos" :key="j" @click="openImageModal(l.photos, j)/>
                  </div>
                </div>
                <div v-if="loadingRadio" class="profile-page mt-4 h-100vh relative d-flex flex-column align-center justify-center">
                  <LoadingComponent color="#9AC8EA"/>
                </div>
                <div v-if="!loadingRadio && radiosList.length == 0">
                  <v-img src="/images/not_found.png" alt="" width="80%" class="mx-auto mt-16"/>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <div  class="full-width" v-if="!loading && photographies.length == 0">
              <v-img src="/images/not_found.png" alt="" width="75%" class="mx-auto"/>
            </div>
          </v-expansion-panels>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox/fancybox.css"

definePageMeta({
  middleware: 'auth'
})
const auth = useAuthStore();
const user = ref(auth.user)
const router = useRouter()
const route = useRoute()

const page = ref(1)
const limit = ref(6)
const loading = ref(true)
const photographies = ref([])
const radiologies = ref([])
const loadingPhoto = ref(true)
const photoClicked = ref(false)
const photosList = ref([])
const loadingRadio = ref(true)
const radioClicked = ref(false)
const radiosList = ref([])

const getDocuments = async () => {
  loading.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const res = await getRequest(`/documents?page=${page.value}&limit=${limit.value}`)
  photographies.value = res.photographies
  radiologies.value = res.radiologies
  loading.value = false
  for (let i = 0; i < photographies.value.length; i++) {
    await getPhotosList(photographies.value[i].id)
  }
  for (let i = 0; i < radiologies.value.length; i++) {
    await getRadioList(radiologies.value[i].id)
  }
}

const getPhotosList = async (id) => {
  loadingPhoto.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const res = await getRequest(`/documents/${id}/photos?page=${page.value}&limit=${limit.value}`)
  photosList.value = res
  loadingPhoto.value = false
}

const getRadioList = async (id) => {
  loadingRadio.value = true
  const {$getRequest: getRequest}=useNuxtApp()
  const res = await getRequest(`/documents/${id}/radios?page=${page.value}&limit=${limit.value}`)
  radiosList.value = res
  loadingRadio.value = false
}

const onBackClicked = () => {
  router.go(-1)
}

const openImageModal = (images: [], n:number) => {
  Fancybox.show(images?.map(i => ({
    src: i,
    type: 'image'
  })),{
    animated: true,
    startIndex: n,
  });
}

const paginate = (p = 1) => {
  page.value = p
  getDocuments()
}

paginate()
</script>

<style scoped lang="scss">

</style>