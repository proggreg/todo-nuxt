<script setup lang="ts">
import { Todo } from '~/types/globals'
import { useListsStore } from '~/stores/lists'

const listsStore = useListsStore()
const newTodo = ref<Todo>({
  name: '',
  done: false,
  dueDate: undefined
})

function addTodo () {
  if (newTodo && listsStore.currentList) {
    if (listsStore.currentList.name === 'Today') {
      const today = new Date()
      newTodo.value.dueDate = today
    }

    listsStore.addTodo(newTodo.value)
  }

  newTodo.value.name = ''
  newTodo.value.done = false
  newTodo.value.dueDate = undefined
}

</script>
<template>
  <v-row v-if="listsStore.currentList" no-gutters>
    <v-col cols="12" class="pb-4">
      <h1 class="text-h4">
        {{ listsStore.currentList.name }}
      </h1>
    </v-col>
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
    </v-col>
  </v-row>
</template>
