<script setup>
import { useListsStore } from '~/stores/lists'
const todoName = ref('')
const listsStore = useListsStore()
const url = computed(() => `/api/list/todo/${listsStore.currentList._id}`)
const { data: todos, refresh } = await useFetch(url)

async function addTodo () {
  if (todoName.value) {
    await $fetch(`/api/list/todo/${listsStore.currentList._id}`, {
      method: 'POST',
      body: {
        name: todoName.value,
        done: false,
        list_id: listsStore.currentList._id
      }
    })
    refresh()
  }

  todoName.value = ''
}

async function deleteTodo (todo) {
  await $fetch(`/api/list/todo/${todo._id}`, {
    method: 'DELETE'
  })
  refresh()
}

function editTodo (todo) {
  todo.done = !todo.done
  $fetch(`/api/list/todo/${todo._id}`, {
    method: 'PUT',
    body: todo
  })
}

</script>

<template>
  <v-text-field
    v-model="todoName"
    variant="solo-filled"
    rounded
    :placeholder="'Add todo to 2' + listsStore.currentList.name"
    @keyup.enter="addTodo()"
  />
  <v-list elevation="0" rounded>
    <v-list-subheader>Todo</v-list-subheader>
    <v-list-item
      v-for="(todo, index) in todos"
      :key="index"
      density="compact"
      variant="text"
    >
      <v-list-item-title
        :class="todo.done ? 'text-decoration-line-through' : ''"
      >
        {{ todo.name }}
      </v-list-item-title>
      <template #prepend="{}">
        <v-list-item-action start>
          <v-checkbox-btn v-model="todo.done" @click="editTodo(todo)" />
        </v-list-item-action>
      </template>
      <template #append="{}">
        <v-list-item-action end>
          <v-btn
            variant="tonal"
            size="x-small"
            rounded
            @click="deleteTodo(todo)"
          >
            Delete
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>
