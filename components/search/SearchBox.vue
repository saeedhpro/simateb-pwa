<template>
  <div class="search-box">
    <input class="search-input" placeholder="نام بیماری ، تخصص ، پزشک و..." v-model="form.q">
    <v-btn size="small" variant="flat" icon class="search-icon">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_22_20)">
          <rect x="13" y="11.1097" width="3" height="9.33708" rx="1.5" transform="rotate(-44.6865 13 11.1097)" fill="#9154F4"/>
          <rect x="13.7071" y="11.1135" width="2" height="8.33708" rx="1" transform="rotate(-44.6865 13.7071 11.1135)" stroke="#6865FA"/>
        </g>
        <g filter="url(#filter1_d_22_20)">
          <circle cx="10.5" cy="6.5" r="6" stroke="#3632EF" shape-rendering="crispEdges"/>
        </g>
        <defs>
          <filter id="filter0_d_22_20" x="9.62129" y="9.62128" width="15.4564" height="15.5055" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_22_20"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_22_20" result="shape"/>
          </filter>
          <filter id="filter1_d_22_20" x="0" y="0" width="21" height="21" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_22_20"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_22_20" result="shape"/>
          </filter>
        </defs>
      </svg>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  q: ''
})

</script>

<style scoped lang="scss">
.search-box {
  width: 100%;
  border-radius: 15px;
  padding: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 #BCDFFF;
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
  top: 8px;
  left: 8px;
}
</style>