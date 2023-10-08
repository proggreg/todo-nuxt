<script setup lang="ts">
const theme = ref('myCustomLightTheme')
</script>
<template>
  <main>
    <v-theme-provider :theme="theme" with-background>
      <v-app>
        <app-nav />

        <v-main>
          <v-container fluid>
            <NuxtPage />
          </v-container>
        </v-main>
      </v-app>
    </v-theme-provider>
  </main>
</template>
