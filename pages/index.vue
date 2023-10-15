<script setup lang="ts">
import { Todo } from '@/types/globals'
const listsStore = useListsStore()
listsStore.getTodaysTodos()
const newTodo = ref<Todo>({
  name: '',
  done: false
})
function addTodo () {
  newTodo.value.dueDate = new Date()
  if (newTodo && listsStore.currentList) {
    listsStore.addTodo(newTodo.value)
  }

  newTodo.value.name = ''
  newTodo.value.done = false
  newTodo.value.dueDate = undefined
}
</script>

<template>
  <h1>Today</h1>

  <v-text-field
    v-if="listsStore.currentList"
    v-model="newTodo.name"
    variant="solo-filled"
    rounded="lg"
    :placeholder="'Add todo to ' + listsStore.currentList.name"
    class="add-todo-field"
    @keyup.enter="addTodo()"
  />

  <app-list-items />
</template>
