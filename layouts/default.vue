<template>
  <main>
    <v-theme-provider :theme="theme" with-background>
      <v-app>
        <v-layout>
          <v-app-bar :elevation="0">
            <NuxtLink to="/about" custom>
              <v-btn class="btn pl-1" to="/">
                Proggreg
              </v-btn>
            </NuxtLink>

            <NuxtLink v-slot="{ navigate }" to="/about" custom>
              <v-btn class="d-none d-sm-flex" @click="navigate">
                about
              </v-btn>
            </NuxtLink>

            <template #append>
              <v-switch inset hide-details="auto" @click="toggleDarkMode">
                <template #prepend>
                  <v-icon v-if="theme === 'light'">
                    mdi-weather-night
                  </v-icon>
                  <v-icon v-else>
                    mdi-weather-sunny
                  </v-icon>
                </template>
              </v-switch>
            </template>
          </v-app-bar>
          <v-main>
            <v-container fluid>
              <NuxtPage />
            </v-container>
          </v-main>
        </v-layout>
      </v-app>
    </v-theme-provider>
  </main>
</template>

<script setup>
let darkMode = 'myCustomLightTheme'
if (
  process.client &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  // dark mode
  darkMode = 'myCustomDarkTheme'
}

const theme = ref(darkMode)

function toggleDarkMode () {
  if (theme.value === 'myCustomDarkTheme') {
    theme.value = 'myCustomLightTheme'
  } else {
    theme.value = 'myCustomDarkTheme'
  }
}
</script>
