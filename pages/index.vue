<script setup lang="ts">
const listsStore = useListsStore()

listsStore.currentList.name = 'Today'

</script>

<template>
  <app-list />
  <app-list-items v-if="listsStore.todaysTodos" :items="listsStore.todaysTodos" />
</template>
