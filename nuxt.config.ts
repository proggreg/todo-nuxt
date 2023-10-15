const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#0000FF'
  }
}
const myCustomDarkTheme = {
  dark: true,
  colors: {
    primary: '#FF0000'
  }
}

export default defineNuxtConfig({
  modules: [
    '@invictus.codes/nuxt-vuetify',
    '@pinia/nuxt',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    'nuxt-mongoose',
    '@vite-pwa/nuxt'
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
  },
  vuetify: {
    vuetifyOptions: {
      theme: {
        themes: {
          myCustomDarkTheme,
          myCustomLightTheme
        }
      }
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    }
  },

  devtools: {
    enabled: true
  }
})
