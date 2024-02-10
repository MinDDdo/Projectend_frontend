import { defineStore } from 'pinia'

interface Auth {
    access_token: string;
    refresh_token: string;
}

export const authStore = defineStore('auth', {
  state: (): Auth => {
    return {
        access_token: '',
        refresh_token: ''
    }
  },

  persist: [
    {
        beforeRestore: (ctx) => {
            // console.log(`about to restore '${ctx.store.$id}'`)
        }
    },
    {
        paths: ['access_token', 'refresh_token'],
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
    },
    {
        // paths: ['refresh_token'],
        // storage: persistedState.cookiesWithOptions({
        //     sameSite: 'strict',
        // }),
    },
    ]
})