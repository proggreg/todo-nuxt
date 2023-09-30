<script setup lang="ts">
import { Todo } from '~/types/globals'
const todaysTodos = ref<Todo[]>([])
</script>

<template>
  <v-list title="Today">
    <v-list-title>Today</v-list-title>
    <v-list-item v-for="todo in todaysTodos" :key="todo.name">
      {{ todo.name }}
    </v-list-item>
  </v-list>
</template>
