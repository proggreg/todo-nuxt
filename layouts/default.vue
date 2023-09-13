<script setup>
const theme = ref('myCustomLightTheme')
const drawer = ref(false)
</script>
<template>
  <main>
    <v-theme-provider :theme="theme" with-background>
      <v-app>
        <v-layout>
          <v-app-bar elevation="0">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
          </v-app-bar>
          <app-nav :drawer="drawer" />
          <v-main>
            <v-container>
              <NuxtPage />
            </v-container>
          </v-main>
        </v-layout>
      </v-app>
    </v-theme-provider>
  </main>
</template>
