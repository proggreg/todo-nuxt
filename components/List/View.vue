<script setup lang="ts">
const listProps = defineProps<{todos: Todo[], listName: string}>()
const statuses = reactive<Status[]>(['Open', 'Done'])
const open = reactive(['Open'])

const todos = reactive(listProps.todos)

const groupedTodos = computed(() => {
  return statuses.map((status) => {
    return {
      status,
      todos: todos ? todos.filter(todo => todo.status === status) : []
    }
  })
})

</script>

<template>
  <v-list :opened="open">
    <v-list-subheader>{{ listProps.listName }}</v-list-subheader>
    <v-list-group v-for="groupedTodo in groupedTodos" :key="groupedTodo.status" :value="groupedTodo.status" fluid>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          :title="groupedTodo.status"
        />
      </template>
      <ListItem :statuses="statuses" :todos="groupedTodo.todos" />
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
