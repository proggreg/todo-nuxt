<script setup lang="ts">
import { Todo } from '@/types/globals'
import { useListsStore } from '@/stores/lists'
const listsStore = useListsStore()
const { data: todayTodos } = useFetch<Todo[]>('/api/today')
listsStore.getLists()
if (todayTodos) {
  listsStore.todaysTodos = todayTodos
}

</script>
<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
