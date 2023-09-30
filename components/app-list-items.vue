<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
import { Todo } from '~/types/globals'
const todoName = ref('')
const listsStore = useListsStore()

onMounted(() => {
  if (listsStore.currentList && listsStore.currentList._id) {
    listsStore.getTodos(listsStore.currentList._id)
  }
})

function addTodo () {
  if (todoName.value && listsStore.currentList) {
    listsStore.addTodo(todoName.value)
  }

  todoName.value = ''
}

function deleteTodo (todo: Todo) {
  if (!todo._id) {
    console.warn('no id to delete')
    return
  }
  listsStore.deleteTodo(todo._id)
}

function editTodo (todo: Todo) {
  todo.done = !todo.done
  $fetch(`/api/list/todo/${todo._id}`, {
    method: 'PUT',
    body: todo
  })
}
function selectTodo (todo: Todo) {
  listsStore.setCurrentTask(todo)
}

</script>

<template>
  <v-text-field
    v-if="listsStore.currentList"
    v-model="todoName"
    variant="solo-filled"
    rounded
    :placeholder="'Add todo to ' + listsStore.currentList.name"

    @keyup.enter="addTodo()"
  >
    <template #append-inner>
      <app-duedate />
    </template>
  </v-text-field>
  <v-list v-if="listsStore.currentList" elevation="0" rounded>
    <v-list-subheader>Todo</v-list-subheader>
    <v-list-item
      v-for="(todo, index) in listsStore.currentList.todos"
      :key="index"
      density="compact"
      variant="text"
    >
      <v-list-item-title
        :class="todo.done ? 'text-decoration-line-through' : ''"
        @click="selectTodo(todo)"
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
