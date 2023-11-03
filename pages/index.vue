<script setup lang="ts">
const listsStore = useListsStore()


</script>

<template>
  <app-list>
    <app-list-items v-if="listsStore.todaysTodos"  :todos="listsStore.todaysTodos" list-name="Today" />
  </app-list>
</template>
