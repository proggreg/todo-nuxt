export default defineNuxtConfig({
  /* ssr: false, */
  modules: [
    "@vite-pwa/nuxt",
    "@invictus.codes/nuxt-vuetify",
    "@nuxtjs/eslint-module",
  ],
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    prerender: {
      routes: [],
    },
  },
  imports: {
    autoImport: true,
  },
  appConfig: {
    // you don't need to include this: only for testing purposes
    buildDate: new Date().toISOString(),
  },
  pwa: {
    registerType: "autoUpdate",
    registerPlugin: false,
    manifest: {
      name: "Proggreg",
      short_name: "Proggreg",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      // periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
