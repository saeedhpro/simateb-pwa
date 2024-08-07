<template>
  <div class="search-box">
    <input class="search-input" placeholder="نام بیماری ، تخصص ، پزشک و..." v-model="form.q" @input="doSearchDebounce">
    <v-btn size="small" variant="flat" icon class="search-icon" @click="onSearchClicked">
      <Icon size="32px" name="mdi:magnify"/>
<!--      <v-icon icon="magnify"></v-icon>-->
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])
const props = defineProps({
  term: {
    type: String,
    default: '',
  },
  time: {
    type: Number,
    default: 500,
  }
})
const form = ref({
  q: props.term
})
const onSearchClicked = () => {
  emit('search', form.value.q)
}
const onSearchInput = () => {
  emit('search', form.value.q)
}
const doSearchDebounce = useDebounce(onSearchInput, props.time)

if (props.term) {
  doSearchDebounce()
}

watch(() => props.term, () => {
  form.value.q = props.term
})
</script>

<style scoped lang="scss">
.search-box {
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  background-color: #FDFDFD;
  border: 1px solid #84A9FE;
  position: relative;
}
.search-input {
  width: 100%;
  outline: none !important;
  &::placeholder {
    color: #A8A8A8;
  }
}
.search-icon {
  position: absolute;
  letter-spacing: 12px;
  top: 6px;
  left: 6px;
}
</style>