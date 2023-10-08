<script setup lang="ts">
const listsStore = useListsStore()
listsStore.getTodaysTodos()
</script>

<template>
  <h1>Today</h1>
  <app-list-items />
</template>
