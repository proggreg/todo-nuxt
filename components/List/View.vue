<script setup lang="ts">
const listProps = defineProps<{todos: Todo[], listName: string}>()
const { statuses } = useSettingsStore()
const open = reactive(['Open'])
const dialog = ref(false)

const todos = reactive(listProps.todos)

const groupedTodos = computed(() => {
  return statuses.map((status) => {
    return {
      status,
      todos: todos ? todos.filter(todo => todo.status === status.name) : []
    }
  })
})

</script>

<template>
  <v-list :opened="open">
    <v-list-subheader>{{ listProps.listName }}</v-list-subheader>
    <v-list-group v-for="groupedTodo in groupedTodos" :key="groupedTodo.status.name" :value="groupedTodo.status.name" fluid>
      <template #activator="{ props }">
        <v-list-item
          v-bind="props"
          :title="`${groupedTodo.status.name} (${groupedTodo.todos.length})`"
        />
      </template>
      <ListItem :statuses="statuses" :todos="groupedTodo.todos" @todo-clicked="dialog = true" />
      <AppDialog :open="dialog" @close="dialog = false">
        <TodoDetail />
      </AppDialog>
    </v-list-group>
  </v-list>
</template>
