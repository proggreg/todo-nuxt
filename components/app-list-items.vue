<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
import { Todo } from '~/types/globals'
const itemProps = defineProps<{items: Todo[]}>()

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

function updateDueDate (newDate: Date, todo: Todo) {
  todo.dueDate = newDate
  $fetch(`/api/list/todo/${todo._id}`, {
    method: 'PUT',
    body: todo
  })
}

const todos = computed(() => {
  return itemProps.items.filter(todo => !todo.done)
})
const complete = computed(() => {
  return itemProps.items.filter(todo => todo.done)
})

</script>

<template>
  <v-row>
    <v-col><app-filter-select /></v-col>
  </v-row>
  <v-list>
    <v-list-item v-if="todos.length" :title="`Todo (${todos.length})`" />
    <v-hover
      v-for="(todo, index) in todos"
      :key="index"
    >
      <template #default="{ isHovering, props }">
        <v-list-item v-bind="props" rounded="lg" :variant="isHovering ? 'tonal' : 'text'" :class="isHovering ? 'mouseOver': ''">
          <template #prepend>
            <v-list-item-action start>
              <v-checkbox-btn v-model="todo.done" @click="editTodo(todo)" />
            </v-list-item-action>
          </template>

          <v-list-item-title
            :class="todo.done ? 'text-decoration-line-through' : ''"
            @click="selectTodo(todo)"
          >
            {{ todo.name }}
          </v-list-item-title>

          <template #append>
            <app-duedate v-if="todo" :date="todo.dueDate" :todo="todo" @set-date="updateDueDate" />
            <v-list-item-action end>
              <v-btn
                variant="text"
                size="x-small"
                rounded="lg"
                icon="mdi-delete"
                @click="deleteTodo(todo)"
              />
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </v-hover>

    <v-list-group v-if="complete.length" fluid :disabled="true">
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          :title="`Complete (${complete.length})`"
        />
      </template>
      <v-hover
        v-for="(todo, index) in complete"
        :key="index"
      >
        <template #default="{ isHovering, props }">
          <v-list-item
            v-bind="props"
            rounded="lg"
            :variant="isHovering ? 'tonal' : 'text'"
            :class="isHovering ? 'mouseOver': ''"
            style="opacity: 0.5;"
          >
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="todo.done" @click="editTodo(todo)" />
              </v-list-item-action>
            </template>

            <v-list-item-title
              :class="todo.done ? 'text-decoration-line-through' : ''"
              @click="selectTodo(todo)"
            >
              {{ todo.name }}
            </v-list-item-title>

            <template #append>
              <AppDuedate :date="todo.dueDate" />

              <v-list-item-action end>
                <v-btn
                  variant="text"
                  size="x-small"
                  rounded="lg"
                  icon="mdi-delete"
                  @click="deleteTodo(todo)"
                />
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-hover>
    </v-list-group>
  </v-list>
</template>
<style scoped>
.add-todo-field {
  position: relative;
  z-index: 1;
}
.mouseOver {
  cursor: pointer;
}
</style>
