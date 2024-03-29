import { defineStore } from 'pinia';

interface AuthStudent {
    access_token: string;
    refresh_token: string;
}

export const authStudentStore = defineStore('auth-student', {
    state: (): AuthStudent => {
        return {
            access_token: '',
            refresh_token: ''
        }
    },

    persist: [
        {
            beforeRestore: (ctx) => {

            }
        },
        {
            paths: ['access_token', 'refresh_token'],
            storage: persistedState.cookiesWithOptions({
                sameSite: 'strict',
            }),
        },
    ]
})