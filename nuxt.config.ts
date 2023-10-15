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
    manifest: {
      name: 'Tickup',
      short_name: 'Tickup',
      description: 'Tick Tick / Clickup type app',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'check-256x-256y.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'check-512x-512y.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    devOptions: {
      enabled: true
    }
  },

  devtools: {
    enabled: true
  }
})
