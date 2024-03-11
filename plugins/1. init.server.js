import {useAuthStore} from "~/stores/auth";
import {ofetch} from "ofetch";

export default defineNuxtPlugin(async(nuxtApp) => {
    if (process.server) {

        const token = useCookie('token')

        if (token.value) {
            const auth = useAuthStore()
            await ofetch('/me',
                {
                    // baseURL: 'http://127.0.0.1:8000/api/app',
                    baseURL: 'https://api.sabaapp.ir/api/app',
                    method: "GET",
                    parseResponse: JSON.parse,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token.value ?? ''}`
                    }
                })
                .then(res => {
                    auth.user = res?.data
                    auth.token = token.value?.toString() ?? ''
                })
                .catch(err => {
                    auth.user = null
                    auth.token = ''
                    token.value = ''
                })
            // auth.user = res.data
            // auth.token = token.value?.toString() ?? ''
        }
    }
    return {
        provide: {
            injected: () => 'my injected function'
        }
    }
})