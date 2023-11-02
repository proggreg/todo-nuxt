<script setup lang="ts">
import { Todo } from '~/types/globals'
import { useListsStore } from '~/stores/lists'

const listsStore = useListsStore()
const newTodo = ref<Todo>({
  name: '',
  done: false,
  dueDate: undefined,
  status: 'Open'
})

async function addTodo () {
  if (newTodo && listsStore.currentList) {
    if (listsStore.currentList.name === 'Today') {
      const today = new Date()
      newTodo.value.dueDate = today
    }
    newTodo.value.list_id = listsStore.currentList._id

    listsStore.addTodo(newTodo.value || '')
    await listsStore.getTodaysTodos()
  }

  newTodo.value.name = ''
  newTodo.value.done = false
  newTodo.value.dueDate = undefined
}

</script>
<template>
  <v-row v-if="listsStore.currentList" no-gutters>
    <v-col cols="12">
      <v-text-field
        v-if="listsStore.currentList"
        v-model="newTodo.name"
        variant="solo-filled"
        rounded="lg"
        :placeholder="'Add todo to ' + listsStore.currentList.name"
        class="add-todo-field"
        @keyup.enter="addTodo"
      >
        <template #append-inner>
          <app-duedate v-if="listsStore.currentList.name !== 'Today'" :date="newTodo.dueDate" @set-date="(newDate: Date) => newTodo.dueDate = newDate" />

          <v-btn :disabled="!newTodo.name" rounded="lg" variant="text" icon="mdi-plus" @click="addTodo" />
        </template>
      </v-text-field>
      <slot />
    </v-col>
  </v-row>
</template>
