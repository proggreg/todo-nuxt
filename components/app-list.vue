<script setup lang="ts">
import { Todo } from '~/types/globals'
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()
const newTodo = ref<Todo>({
  name: '',
  done: false,
  dueDate: undefined
})

const list = computed(() => { // TODO if there is no current list go to today?
  if (!listsStore.currentList) {
    listsStore.setCurrentList(listsStore.lists[0])
    return listsStore.lists[0]
  }
  return listsStore.currentList
})
const open = useNav()

function addTodo () {
  if (newTodo && listsStore.currentList) {
    listsStore.addTodo(newTodo.value)
  }

  newTodo.value.name = ''
  newTodo.value.done = false
  newTodo.value.dueDate = undefined
}

</script>
<template>
  <v-row v-if="list" no-gutters class="py-4">
    <v-col cols="1" class="d-lg-none">
      <v-icon @touchstart="open = true" @mouseover="open = true">
        mdi-format-list-bulleted
      </v-icon>
    </v-col>
    <v-col cols="12" class="py-4">
      <h1 class="text-h4">
        {{ list.name }}
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
        @keyup.enter="addTodo()"
      >
        <template #append-inner>
          <app-duedate @set-date="(newDate: Date) => newTodo.dueDate = newDate" />

          <v-btn :disabled="!newTodo.name" rounded="lg" variant="text" icon="mdi-plus" @click="addTodo" />
        </template>
      </v-text-field>
      <app-list-items
        v-if="list"
      />
    </v-col>
  </v-row>
</template>
