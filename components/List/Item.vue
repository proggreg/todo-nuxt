<script lang="ts" setup>
const listsStore = useListsStore()
const itemProps = defineProps<{
  todos: Todo[]
  statuses: Status[]
}>()
const todos = reactive(itemProps.todos)

const statusColorMapping = {
  Open: '#87909e',
  Done: '#008844'
}

function selectTodo (todo: Todo) {
  listsStore.setCurrentTodo(todo)
}

function editTodo (todo: Todo, status: Status) {
  todo.status = status
  $fetch(`/api/list/todo/${todo._id}`, {
    method: 'PUT',
    body: todo
  })
}
// TODO updateDueDate
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateDueDate (newDate: Date, todo: Todo) {
  todo.dueDate = newDate
  $fetch(`/api/list/todo/${todo._id}`, {
    method: 'PUT',
    body: todo
  })
}

function deleteTodo (todo: Todo) {
  if (todo._id) {
    listsStore.deleteTodo(todo._id)
  }
}

</script>

<template>
  <v-hover
    v-for="(todo, index) in todos"
    :key="index"
  >
    <template #default="{ isHovering, props }">
      <v-list-item
        v-bind="props"
        rounded="lg"
        :variant="isHovering ? 'tonal' : 'text'"
        :class="isHovering ? 'mouseOver': ''"
      >
        <template #prepend>
          <v-list-item-action start>
            <v-menu>
              <template #activator="{props}">
                <div
                  class="status-icon"
                  :style="{
                    backgroundColor: statusColorMapping[todo.status]
                  }"
                  v-bind="props"
                />
              </template>
              <v-list>
                <v-list-item v-for="status in statuses" :key="status" @click="editTodo(todo, status)">
                  {{ status }}
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </template>

        <v-list-item-title @click="selectTodo(todo)">
          {{ todo.name }}
        </v-list-item-title>

        <template #append>
          <AppDueDate :date="todo.dueDate" />

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
</template>
