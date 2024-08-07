<template>
  <v-sheet
    elevation="0"
    class="px-8"
  >
    <v-slide-group
      :multiple="true"
    >
      <BlogTagListSmallItem
        v-for="(tag, n) in list"
        :key="n"
        :tag="tag"
        @select="selectTag"
        @unselect="unSelectTag"
      />
    </v-slide-group>
  </v-sheet>
</template>

<script setup lang="ts">
const emits = defineEmits(['select', 'unselect'])

const {$getRequest: getRequest}=useNuxtApp()
const list = ref([])
const {data: tags} = await getRequest('/tags')
list.value = tags ?? []

const selectTag = (tag: String) => {
  emits('select', tag)
}

const unSelectTag = (tag: String) => {
  emits('unselect', tag)
}
</script>

<style scoped lang="scss">

</style>