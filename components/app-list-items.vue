<script setup>
import { useListsStore } from '~/stores/lists'
const taskName = ref('')
const listsStore = useListsStore()
const showContextMenu = ref(false)
const emit = defineEmits(['selectTodo'])

function addTask () {
  if (taskName.value) {
    listsStore.addTask(taskName)
  }

  taskName.value = ''
}

function deleteTask (list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1)
  }
}

function editTask (todo) {
  listsStore.setCurrentTask(todo)
  emit('selectTodo')
}

function openContextMenu () {
  showContextMenu.value = true
}
</script>

<template>
  <v-text-field
    v-model="taskName"
    variant="solo-filled"
    rounded
    :placeholder="'Add task to ' + listsStore.currentList.name"
    @keyup.enter="addTask()"
  />
  <v-list :items="listsStore.currentList.tasks" elevation="0" rounded>
    <v-list-subheader>Tasks</v-list-subheader>
    <v-list-item
      v-for="(task, index) in listsStore.currentList.tasks"
      :key="index"
      density="compact"
      variant="text"
      @click.right.prevent="openContextMenu"
    >
      <v-list-item-title
        :class="task.done ? 'text-decoration-line-through' : ''"
        @click="editTask(task)"
      >
        {{ task.name }}
      </v-list-item-title>
      <template #prepend="{}">
        <v-list-item-action start>
          <v-checkbox-btn v-model="task.done" />
        </v-list-item-action>
      </template>
      <template #append="{}">
        <v-list-item-action end>
          <v-btn
            variant="tonal"
            size="x-small"
            rounded
            @click="deleteTask(list, index)"
          >
            Delete
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
  <app-context-menu :menu-items="[{label:'one'}, {label:'two'}]" />
</template>
