// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { host: "0.0.0.0" },
  runtimeConfig: {
    public: {
      api: process.env.API_URL,
      git_path: process.env.GIT_PATH,
      git_token: process.env.GIT_TOKEN,
    }
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/icon',
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }
})
