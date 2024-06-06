import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: '',
        showLogin: false,
        searchTerm: ''
    }),
    getters: {
        isOpenLogin: (state) => state.showLogin
    },
    actions: {
        openLoginModal(){
            this.showLogin = true
        },
        closeLoginModal(){
            this.showLogin = false
        }
    }
})