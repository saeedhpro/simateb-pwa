<template>
  <v-slide-group-item
    active-class="purple--text"
    @click.native="toggleSelect(tag)"
    v-slot="{ isSelected, toggle }"
    :center-active="false"
  >
    <v-btn
        class="tag-small-item me-2 mt-3"
        :class="{'selected': isSelected}"
        rounded
        :color="isSelected ? '#137EEA' : '#FFFFFF'"
        @click="toggleSelect(tag, toggle, isSelected)"
        elevation="0"
    >
      <span>{{ tag }}</span>
    </v-btn>
  </v-slide-group-item>
</template>

<script setup lang="ts">
const emits = defineEmits(['select', 'unselect'])
const props = defineProps({
  tag: {
    type: String,
    required: true,
  }
})

const toggleSelect = (tag: String, toggle: Function, isSelected: Boolean) => {
  toggle()
  emits(isSelected ? 'unselect' : 'select', tag)
}
</script>

<style scoped lang="scss">

</style>