export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  }
})