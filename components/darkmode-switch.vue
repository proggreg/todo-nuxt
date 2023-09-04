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
</script>>
<template>
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
