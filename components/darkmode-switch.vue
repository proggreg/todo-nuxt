<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()

function toggleDarkMode () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
<template>
  <v-switch inset :hide-details="true" @click="toggleDarkMode">
    <template #prepend>
      <v-icon v-if="theme.global.name.value === 'light'">
        mdi-weather-night
      </v-icon>
      <v-icon v-else>
        mdi-weather-sunny
      </v-icon>
    </template>
  </v-switch>
</template>
