<template>
  <div class="custom-autocomplete-box">
    <input ref="inputRef"
           :id="uniqueID"
           class="custom-autocomplete-input"
           @focusin="onInputFocusIn"
           @focusout="onInputFocusOut"
           :placeholder="placeholder"
           v-model="searchTerm"
    >
    <span @click="onInputFocusClicked" class="custom-autocomplete-icon" ref="iconref">
      <Icon size="32px" :name="onFocus ? 'mdi:chevron-up' : 'mdi:chevron-down'"/>
    </span>
    <div class="custom-autocomplete-items-box" :class="{'show': onFocus}">
      <v-virtual-scroll
          :items="items"
          height="120"
          item-height="36"
      >
        <template v-slot:default="{ item }">
          <v-list-item @click="selectItem(item)" :title="item.name" />
        </template>
      </v-virtual-scroll>
    </div>
  </div>

</template>

<script setup lang="ts">

import {uniqueId} from "@splidejs/splide/src/js/utils";

const emits = defineEmits(['select'])

const props = defineProps({
  selected: {
    type: Object,
    default: null
  },
  items: {
    type: Array,
    default: []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const onFocus = ref(false)
const openMenu = ref(false)
const searchTerm = ref<string>('')
const selectedItem = ref({})

const inputRef = ref(null)
const onInputFocusIn = () => {
  onFocus.value = true
  openMenu.value = true
}

const onInputFocusOut = () => {
  setTimeout(() => {
    onFocus.value = false
    openMenu.value = false
  }, 200)
}

const uniqueID = computed(() => uniqueId('custom-autocomplete-'));

const onInputFocusClicked = () => {
  onInputFocusIn()
  const inp: HTMLElement | null = inputRef.value
  inp?.focus()
}

const selectItem = (item: any) => {
  if (selectedItem.value && selectedItem.value.id == item.id) {
    searchTerm.value = ''
    selectedItem.value = {}
    emits('select', null)
  } else {
    searchTerm.value = item.name
    selectedItem.value = item
    emits('select', item)
  }
  onInputFocusOut()
}

const setSelectedValue = () => {
  if (props.selected) {
    searchTerm.value = props.selected.name
    selectedItem.value = props.selected
  }
}

setSelectedValue()
</script>

<style scoped lang="scss">
.custom-autocomplete-box {
  width: 100%;
  border-radius: 15px;
  padding: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 #BCDFFF;
  position: relative;
}
.custom-autocomplete-input {
  width: 100%;
  outline: none !important;
  &::placeholder {
    color: #A8A8A8;
  }
}

.custom-autocomplete-icon {
  position: absolute;
  letter-spacing: 12px;
  top: 8px;
  left: 5px;
}

.custom-autocomplete-items-box {
  position: absolute;
  bottom: -124px;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: #FFF;
  transition: transform 0.5s;
  transform: scaleY(0);
  transform-origin: top;
  z-index: 999999999;
  border-bottom: 20px;
  padding-bottom: 10px;
}

//input.custom-autocomplete-input:focus ~ .custom-autocomplete-items-box {
//  transform: scaleY(1);
//}
.custom-autocomplete-items-box.show {
  transform: scaleY(1);
}
</style>