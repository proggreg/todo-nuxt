<script setup lang="ts">
const todaysTodos = ref([])
</script>

<template>
  <v-list title="Today">
    <v-list-title>Today</v-list-title>
    <v-list-item v-for="todo in todaysTodos">
      Task
    </v-list-item>
  </v-list>
</template>
