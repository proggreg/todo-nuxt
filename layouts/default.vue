import { ref } from 'vue'
<script setup>
// you don't need this: only for testing purposes
const date = useAppConfig().buildDate
let darkMode = 'dark';
if (process.client && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    darkMode = 'dark';
}

var theme = ref(darkMode);

function toggleDarkMode(params) {
  console.log('toggleDarkMode')
  if (theme.value === 'light') {
    theme.value = 'dark'
  } else {
    theme.value = 'light'
  }
 }
</script>

<template>
  <main>
    <v-theme-provider :theme="theme" with-background>
    <v-app :full-height="true">
      <v-layout>
    <v-app-bar :elevation="0">
      <NuxtLink v-slot="{ navigate }" to="/about" custom>
        <v-btn class="btn pl-1" to="/">
        Proggreg
      </v-btn>
      </NuxtLink>
    
      <NuxtLink v-slot="{ navigate }" to="/about" custom>
        <v-btn class="d-none d-sm-flex" @click="navigate">
            about
        </v-btn>
      </NuxtLink>
      
    <template v-slot:append>
      <v-switch inset @click="toggleDarkMode" hide-details="auto">
        <template v-slot:prepend>
          <v-icon v-if="theme === 'light'">mdi-weather-night</v-icon>
          <v-icon v-else>mdi-weather-sunny</v-icon>
        </template>
      </v-switch>
    </template>
  </v-app-bar>
      <v-main>
        <v-container fluid >
        <slot />  
      </v-container>
      </v-main>
  
      <!-- TODO finish bottom nav -->
    <!-- <v-bottom-navigation :elevation="0" grow>
  <v-btn value="recent">
    <v-icon>mdi-history</v-icon>

    Recent
  </v-btn>

  <v-btn value="favorites">
    <v-icon>mdi-heart</v-icon>

    Favorites
  </v-btn>

  <v-btn value="nearby">
    <v-icon>mdi-map-marker</v-icon>

    Nearby
  </v-btn>
</v-bottom-navigation> -->
<ClientOnly>
      <v-card
        v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      >
        <div class="message">
          <span v-if="$pwa.offlineReady">
            App ready to work offline
          </span>
          <span v-else>
            New content available, click on reload button to update.
          </span>
        </div>
        <button
          v-if="$pwa.needRefresh"
          @click="$pwa.updateServiceWorker()"
        >
          Reload
        </button>
        <button @click="$pwa.cancelPrompt()">
          Close
        </button>
      </v-card>
      <v-card
        v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
        class="pwa-toast"
        role="alert"
      >
        <div class="message">
          <span>
            Install PWA
          </span>
        </div>
        <v-btn @click="$pwa.install()">
          Install
        </v-btn>
        <v-btn variant="tonal" @click="$pwa.cancelInstall()">
          Cancel
        </v-btn>
      </v-card>
</ClientOnly>
  </v-layout>
  </v-app>
</v-theme-provider>
 
  
  </main>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
