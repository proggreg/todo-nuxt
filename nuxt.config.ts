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
    '@pinia/nuxt',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    'nuxt-mongoose',
    'vuetify-nuxt-module',
    '@nuxtjs/eslint-module'
  ],

  experimental: {
    payloadExtraction: false,
    typedPages: false
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
    dirs: ['./stores'],
    presets: [{
      from: 'vuetify',
      imports: ['useDisplay']
    }, {
      from: 'vuetify/labs/date',
      imports: ['useDate']
    }]
  },

  pinia: {
    storesDirs: ['./stores/**']
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

  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: 'Tickup',
  //     short_name: 'Tickup',
  //     description: 'Tick Tick / Clickup type app',
  //     theme_color: '#ffffff',
  //     icons: [
  //       {
  //         src: 'check-256x-256y.png',
  //         sizes: '256x256',
  //         type: 'image/png'
  //       },
  //       {
  //         src: 'check-512x-512y.png',
  //         sizes: '512x512',
  //         type: 'image/png'
  //       }
  //     ]
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 20
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}']
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: 'module'
  //   }
  // },
  typescript: {
    strict: true
  },
  devtools: {
    enabled: true
  }
})
