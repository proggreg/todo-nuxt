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
    'nuxt-time'
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

    },
    moduleOptions: {
      useVuetifyLabs: true
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  typescript: {
    strict: true
  },
  devtools: {
    enabled: true
  }
})
