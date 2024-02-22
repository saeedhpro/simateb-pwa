import { createApp } from "vue";
import Toast, {type PluginOptions, POSITION  } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {

    const options: PluginOptions = {
        position: POSITION.TOP_RIGHT
    };

    nuxtApp.vueApp.use(Toast, options);
})
