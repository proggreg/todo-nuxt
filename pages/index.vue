<script setup lang="ts">
const listsStore = useListsStore()
listsStore.getTodaysTodos()

watch(listsStore.todaysTodos, (todos) => {
  console.log('todaysTodos', todos)
})

</script>

<template>
  <app-list v-if="listsStore.currentList" :list="listsStore.currentList" />
</template>
