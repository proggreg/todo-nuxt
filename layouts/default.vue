<template>
  <main>
    <v-theme-provider :theme="theme" with-background>
      <v-app :full-height="true">
        <v-layout>
          <v-app-bar :elevation="0">
            <NuxtLink to="/about" custom>
              <v-btn class="btn pl-1" to="/"> Proggreg </v-btn>
            </NuxtLink>

            <NuxtLink v-slot="{ navigate }" to="/about" custom>
              <v-btn class="d-none d-sm-flex" @click="navigate"> about </v-btn>
            </NuxtLink>

            <template #append>
              <v-switch inset hide-details="auto" @click="toggleDarkMode">
                <template #prepend>
                  <v-icon v-if="theme === 'light'">mdi-weather-night</v-icon>
                  <v-icon v-else>mdi-weather-sunny</v-icon>
                </template>
              </v-switch>
            </template>
          </v-app-bar>
          <v-main>
            <v-container fluid>
              <slot />
            </v-container>
          </v-main>
        </v-layout>
      </v-app>
    </v-theme-provider>
  </main>
</template>
<script setup>
let darkMode = "dark";
if (
  process.client &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // dark mode
  darkMode = "dark";
}

const theme = ref(darkMode);

function toggleDarkMode() {
  if (theme.value === "light") {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
}
</script>
