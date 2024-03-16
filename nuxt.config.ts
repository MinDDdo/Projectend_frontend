export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  css: [
    '~/assets/css/main.css',
    '@vuepic/vue-datepicker/dist/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-headlessui',
    'nuxt-icon',
    "@nuxt/image"
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  }
})