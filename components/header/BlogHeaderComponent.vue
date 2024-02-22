<template>
  <div class="header-component blog-header px-4 py-4 rtl d-flex flex-row align-center justify-space-between full-width">
    <v-btn
      icon
      variant="text"
    >
      <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="25" height="5" fill="#7686F9"/>
        <rect y="8.33337" width="13" height="5" fill="#7686F9"/>
        <rect y="16.6666" width="10.5" height="5" fill="#7686F9"/>
        <rect y="23.5" width="20.6667" height="5" fill="#7686F9"/>
      </svg>
    </v-btn>
    <v-img src="/images/blog-logo.png"/>
    <router-link
        to="/account/profile"
    >
      <v-btn
          link
          variant="text"
          icon
      >
        <svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle cx="18.9" cy="24.6" r="18" fill="#EEF0F3"/>
          <rect width="39" height="47.4" fill="url(#pattern0)"/>
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_1327_7" transform="matrix(0.00759615 0 0 0.00625 -0.225433 0)"/>
            </pattern>
            <image id="image0_1327_7" width="191" height="160" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAACgCAYAAABdar1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OSwgMjAyMi8wNi8xMy0xNzo0NjoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjUgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0xMi0wOVQxMTo1MTo1Ny0wODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMTItMDlUMTE6NTM6NTEtMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMTItMDlUMTE6NTM6NTEtMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE3MzE5NjJlLTFkNmItYzA0OC1hYWFiLTliODA1MjJlYTE5YyIgeG1wTU06RG9jdW1lbnRJRD0i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"/>
          </defs>
        </svg>
      </v-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>