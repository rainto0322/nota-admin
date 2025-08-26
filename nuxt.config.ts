// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { host: "0.0.0.0", },
  runtimeConfig: {
    public: {
      api: process.env.API_URL
    }
  },
  modules: [
    '@unocss/nuxt',
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
