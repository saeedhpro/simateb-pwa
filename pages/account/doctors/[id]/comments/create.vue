<template>
  <div v-if="loading" class="comment-create-page relative d-flex flex-column align-center justify-center h-full">
    <LoadingComponent color="#9AC8EA"/>
  </div>
  <div v-else class="comment-create-page relative d-flex flex-column align-start justify-start h-full">
    <BackButton
        @click="onBackClicked"
    />
    <div class="comment-create-page-top">
      <div class="comment-create-page-doctor-box">
        <v-avatar v-if="doctor.logo" size="40">
          <v-img
              :src="doctor.logo"
          ></v-img>
        </v-avatar>
        <div class="doctor-full-name">ثبت نظر برای <span>دکتر محمد کریم سلطانی</span></div>
      </div>
    </div>
    <div class="comment-form">
      <v-stepper
          v-model="index"
          elevation="0"
          bg-color="transparent"
          :items="[1,2,3,4,5]"
          show-actions
          style="padding-bottom: 60px; position: relative !important;"
      >
        <template v-slot:item.1>
          <div class="question-box">
            <p>
              1- آیا این پزشک را به دیگران پیشنهاد میدهید؟
            </p>
            <span>
              پاسخ به سوال الزامی است.
            </span>
            <div class="like-question">
              <div class="like-box" :class="{'selected': form.do_yo_share}" @click="doLike(true)">
                <span>بله</span>
                <LikeUpComponent />
              </div>
              <div class="like-box" :class="{'selected': !form.do_yo_share}" @click="doLike(false)">
                <span>خیر</span>
                <LikeDownComponent />
              </div>
            </div>
          </div>
        </template>

        <template v-slot:item.2>
          <div class="question-box">
            <p>
              2- برای درمان چه بیماری به پزشک مراجعه کردید؟
            </p>
            <v-autocomplete
                label=""
                :items="caseTypes"
                variant="outlined"
                class="doctor-form-autocomplete rounded-lg"
                v-model="form.case_type"
                bg-color="#fff"
                search="name"
                custom-filter="name"
                item-title="name"
                item-value="name"
                :return-object="false"
                auto-select-first
                density="compact"
                theme="light"
                rounded
                placeholder="عنوان بیماری را انتخاب کنید"
                @update:modelValue="onCaseTypeSelected"
            ></v-autocomplete>
          </div>
        </template>

        <template v-slot:item.3>
          <div class="question-box">
            <p>
              3- نتیجه درمان شما چگونه بود؟
            </p>
            <div class="like-question">
              <div class="result-box" :class="{'selected': form.result_index == 1}" @click="setResult(1, 'بله درمان شدم')">
                <span class="circle"></span>
                <span>بله درمان شدم</span>
              </div>
              <div class="result-box" :class="{'selected': form.result_index == 2}" @click="setResult(2, 'خیر درمان نشدم')">
                <span class="circle"></span>
                <span>خیر درمان نشدم</span>
              </div>
            </div>
            <div class="like-question">
              <div class="result-box" :class="{'selected': form.result_index == 3}" @click="setResult(3, 'در حال درمان هستم')">
                <span class="circle"></span>
                <span>در حال درمان هستم</span>
              </div>
              <div class="result-box" :class="{'selected': form.result_index == 4}" @click="setResult(4, 'سایر موارد')">
                <span class="circle"></span>
                <span>سایر موارد</span>
              </div>
            </div>
          </div>
        </template>

        <template v-slot:item.4>
          <div class="question-box">
            <p>
              4- لطفا تجربه درمان خود را از ویزیت پزشک بنویسید:
              <br/>
              <br/>
              کیفیت درمان، مدت زمان درمان، داروهای مصرفی و نحوه برخورد پزشک
            </p>
            <span>
              پاسخ به سوال الزامی است.
            </span>
            <div class="like-question">
              <v-textarea style="margin: 10px" v-model="form.description" variant="solo" bg-color="#fff" />
            </div>
          </div>
        </template>

        <template v-slot:item.5>
          <div class="question-box">
            <p>
              5- لطفا میزان رضایت خود از پزشک را زمینه های زیر انتخاب کنید:
              <br/>
            </p>
            <div class="like-question">
              <div class="comments-rating-box full-width">
                <CommentRateSelectItem
                    title="برخورد مناسب پزشک"
                    v-model="form.treat_rate"
                />
                <CommentRateSelectItem
                    title="توضیح پزشک در هنگام ویزیت"
                    v-model="form.explanation_rate"
                />
                <CommentRateSelectItem
                    title="مهارت و تخصص پزشک"
                    v-model="form.skill_rate"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-slot:next>
          <v-btn v-if="index < 5" @click="goNext" color="#41A0F7" rounded  variant="flat" text="#fff">
            <span style="color: #fff !important;">بعدی</span>
          </v-btn>
        </template>
        <template v-slot:prev>
          <v-btn @click="gePrev" color="#41A0F7" variant="flat" rounded text="#fff">
            <span style="color: #fff !important;">قبلی</span>
          </v-btn>
        </template>
        <v-btn class="save-comment" ref="save" v-if="index >= 5" @click="saveComment" color="#41A0F7" rounded  variant="flat" text="#fff">
          <span style="color: #fff !important;">ثبت نظر</span>
        </v-btn>
      </v-stepper>
    </div>
  </div>
</template>

<script setup lang="ts">

import BackButton from "~/components/action/BackButton.vue";
import LikeUpComponent from "~/components/images/LikeUpComponent.vue";
import LikeDownComponent from "~/components/images/LikeDownComponent.vue";
import CustomAutocomplete from "~/components/input/CustomAutocomplete.vue";
import CommentRateItem from "~/components/doctor/CommentRateItem.vue";
import CommentRateSelectItem from "~/components/doctor/CommentRateSelectItem.vue";
const app = useNuxtApp()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const loading = ref(true)

const save = ref()
const index = ref(1)
const doctor = ref({
  id: 0,
  full_name: '',
  logo: '/images/doctors/doctor.png',
})

const caseTypes = ref([])

const form = ref({
  do_yo_share: true,
  case_type: '',
  result: false,
  result_index: 1,
  result_desc: '',
  description: '',
  skill_rate: 0,
  treat_rate: 0,
  explanation_rate: 0,
})

const getDoctor = async () => {
  const {$getRequest: getRequest}=app
  const {data: d} = await getRequest(`/doctors/${id}`)
  doctor.value.id = d.id
  doctor.value.full_name = d.full_name
  doctor.value.logo = d.logo || '/images/doctors/doctor.png'
  loading.value = false
}

const getDoctorCaseTypes = async () => {
  const {$getRequest: getRequest}=app
  const {data: cases} = await getRequest(`/doctors/${id}/cases`)
  caseTypes.value = cases
}

const onBackClicked = () => {
  router.back()
}

const goNext = () => {
  if (index.value == 2 && !form.value.case_type) {
    app.$toast.error('علت مراجعه را انتخاب کنید', {
      autoClose: 2000,
    });
    return
  }
  if (index.value < 5) {
    index.value += 1
  }
}

const gePrev = () => {
  if (index.value > 1) {
    index.value -= 1
  }
}

const doLike = (like: boolean) => {
  form.value.do_yo_share = like
}

const onCaseTypeSelected = (caseType) => {
  form.value.case_type = caseType
}

const setResult = (index, result) => {
  form.value.result_index = index
  form.value.result_desc = result
}

const saveComment = () => {
  const {$postRequest: postRequest}=app
  postRequest(`/doctors/${id}/comments`, {
    do_yo_share: form.value.do_yo_share,
    case_type: form.value.case_type,
    result: form.value.result,
    result_index: form.value.result_index,
    result_desc: form.value.result_desc,
    description: form.value.description,
    skill_rate: form.value.skill_rate,
    treat_rate: form.value.treat_rate,
    explanation_rate: form.value.explanation_rate,
  })
      .then(res => {
        app.$toast.info('نظر شما با موفقیت ثبت شد', {
          autoClose: 2000,
        });
        router.push(`/account/doctors/${id}`)
      })
      .catch(err => {
        app.$toast.error('متاسفانه خطایی رخ داده است', {
          autoClose: 2000,
        });
      })
}

getDoctor()
getDoctorCaseTypes()
</script>

<style scoped lang="scss">
.save-comment {
  position: absolute;
  left: 0;
}
</style>