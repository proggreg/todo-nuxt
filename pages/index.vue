<script setup lang="ts">
import { Todo } from '@/types/globals'
const listsStore = useListsStore()
listsStore.getTodaysTodos()

function todoSelected () {
  console.log('selected')
}

</script>

<template>
  <app-list @todo-Selected="todoSelected" />
</template>
