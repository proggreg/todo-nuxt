<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
import { Todo, Status } from '~/types/globals'
const listProps = defineProps<{todos: Todo[], listName: string, statuses: Status[]}>()

const statusColorMapping = {
  Open: '#87909e',
  Done: '#008844'
}

const listsStore = useListsStore()

function deleteTodo (todo: Todo) {
  if (!todo._id) {
    console.warn('no id to delete')
    return
  }
  listsStore.deleteTodo(todo._id)
}

function editTodo (todo: Todo, status: string) {
  todo.status = status
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

</script>

<template>
  <v-list>
    <v-list-group v-for="status in listProps.statuses" :key="status" fluid>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          :title="status"
        />
      </template>
      <v-hover
        v-for="(todo, index) in listProps.todos"
        :key="index"
      >
        <template #default="{ isHovering, props }">
          <v-list-item
            v-if="todo.status === status"
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
                        backgroundColor: statusColorMapping[status]
                      }"
                      v-bind="props"
                    />
                  </template>
                  <v-list>
                    <v-list-item v-for="status in listProps.statuses" :key="status" @click="editTodo(todo,status)">
                      {{ status }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </template>

            <v-list-item-title

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

.status-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.add-todo-field {
  position: relative;
  z-index: 1;
}
.mouseOver {
  cursor: pointer;
}
</style>
