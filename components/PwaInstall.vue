<template>
  <div class="h-full">
    <button
        v-if="showInstallButton"
        @click="installPWA"
        class="pwa-install-btn"
    >
      نصب اپلیکیشن
    </button>
  </div>
</template>

<script setup>
let installPrompt = null;
const showInstallButton = ref(false);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log(e, "Eee")
    e.preventDefault();
    installPrompt = e;
    showInstallButton.value = true;
    console.log('✅ beforeinstallprompt fired');
  });
});

const installPWA = () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  installPrompt.userChoice.then((result) => {
    if (result.outcome === 'accepted') {
      console.log('✅ User accepted install');
    } else {
      console.log('❌ User dismissed install');
    }
    installPrompt = null;
    showInstallButton.value = false;
  });
};
</script>

<style scoped>
.pwa-install-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #4DBA87;
  color: white;
  border: none;
  border-radius: 5px;
  z-index: 1000;
  cursor: pointer;
}
</style>
