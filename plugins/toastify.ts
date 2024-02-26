import Toast, {type PluginOptions  } from "vue-toastification";
import "vue-toastification/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {

    const options: PluginOptions = {
        position: "top-right"
    };

    nuxtApp.vueApp.use(Toast, options);
})
