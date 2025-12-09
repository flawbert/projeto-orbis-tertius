export default defineNuxtConfig({

  runtimeConfig: {
    public: {
      gestoreApiUrl: process.env.GESTORE_API_URL,
      gestoreApiKey: process.env.GESTORE_API_KEY,
    },
  },

  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  modules: ["@pinia/nuxt", "nuxt-security"],
  css: ["~/assets/css/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/variables" as *;',
        },
      },
    },
  },
});