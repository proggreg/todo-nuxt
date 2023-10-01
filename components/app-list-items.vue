<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
import { Todo } from '~/types/globals'

const listsStore = useListsStore()

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

onMounted(() => {
  if (listsStore.currentList && listsStore.currentList._id) {
    listsStore.getTodos(listsStore.currentList._id)
  }
})

</script>

<template>
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
        <NuxtTime v-if="todo.dueDate" :datetime="todo.dueDate" month="long" day="numeric" />
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
<style scoped>
.add-todo-field {
  position: relative;
  z-index: 1;
}
</style>
