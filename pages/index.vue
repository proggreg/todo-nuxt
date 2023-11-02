<script setup lang="ts">
const listsStore = useListsStore()
const statuses = reactive(['Open', 'Done'])

</script>

<template>
  <app-list>
    <app-list-items v-if="listsStore.todaysTodos" :statuses="statuses" :todos="listsStore.todaysTodos" list-name="Today" />
  </app-list>
</template>
