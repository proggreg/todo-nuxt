<script setup>
import { useListsStore } from '~/stores/lists'

const itemRefs = ref([])
const taskName = ref('')
const listsStore = useListsStore()
const showContextMenu = ref(false)

function addTask () {
  if (taskName.value) {
    listsStore.addTask(taskName)
  }

  taskName.value = ''
}

function deleteTask (list, index) {
function deleteTask (list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1)
  }
}

function editTask (todo) {
  listsStore.setCurrentTask(todo)
}

function openContextMenu () {
  showContextMenu.value = true
}
</script>

<template>
  <v-text-field v-model="taskName" placeholder="Task" @keyup.enter="addTask()" />
  <v-list :key="index" :items="listsStore.currentList.tasks" elevation="0" rounded>
    <v-list-subheader>Tasks</v-list-subheader>
    <v-list-item
      v-for="(task, index) in listsStore.currentList.tasks"
      :key="index"
      ref="itemRefs"
      density="compact"
      variant="tonal"
      @click="editTask(task)"
      @click.right.prevent="openContextMenu"
    >
      <v-list-item-title :class="task.done ? 'text-decoration-line-through' : ''">
        {{ task.name }}
      </v-list-item-title>
      <template #prepend="{}">
        <v-list-item-action start>
          <v-checkbox-btn v-model="task.done" />
          <v-checkbox-btn v-model="task.done" />
        </v-list-item-action>
      </template>
      <template #append="{}">
        <v-list-item-action end>
          <v-btn
            variant="tonal"
            size="x-small"
            @click="deleteTask(list, index)"
          >
            Delete
          </v-btn>
            Delete
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
  <app-context-menu :menu-items="[{label:'one'}, {label:'two'}]" />
</template>
