<script setup lang="ts">
const listsStore = useListsStore()

</script>

<template>
  <app-list>
    <app-list-items v-if="listsStore.todos" :todos="listsStore.todos" list-name="Today" />
  </app-list>
</template>
