// stores/counter.js
import { defineStore } from 'pinia'
import baseUrl from '../connect';

export const useLoginStore = defineStore('loginstate', {
    id: 'auth',
    state: () => {
        return { login: null, userInfo: null }
    },
    actions: {
        async checkLogin() {
            try {
                const response = await baseUrl.post('/admin/login/state');
                this.login = response.data.state
                this.userInfo = response.data.userInfo
            } catch (error) {
                console.error("Error in checkLogin:", error);
            }
        },
        toggleButton(state) {
            this.login = state
        }

    }

})