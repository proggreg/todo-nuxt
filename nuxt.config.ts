export default defineNuxtConfig({
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module'
  ],

  experimental: {
    payloadExtraction: false
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      routes: []
    }
  },
  imports: {
    autoImport: true,
    dirs: ['./stores']
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  }
})
