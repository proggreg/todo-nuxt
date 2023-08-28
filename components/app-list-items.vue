<script setup>
import { useListsStore } from '~/stores/lists'
const taskName = ref('')
const listsStore = useListsStore()
const showContextMenu = ref(false)
const emit = defineEmits(['selectTodo'])
const debug = ref('')

async function addTask () {
  if (taskName.value) {
    listsStore.addTask(taskName)
    const { data } = await useFetch(`/api/list/todo/${listsStore.currentList._id}`, {
      method: 'PUT',
      body: {
        name: taskName.value,
        done: false
      }
    })
    console.log(data)
    listsStore.setCurrentListTasks(data.value.todos)
  }

  taskName.value = ''
}

async function deleteTask (taskName) {
  const data = await $fetch(`/api/list/todo/${listsStore.currentList._id}`, {
    method: 'DELETE',
    body: {
      name: taskName
    }
  })
  if (data && data.todos) {
    listsStore.setCurrentListTasks(data.todos)
  } else {
    listsStore.setCurrentListTasks([])
  }
}

async function editTask (todo) {
  console.log('edit ', todo)
  const { data } = await useFetch(`/api/list/todo/${listsStore.currentList._id}`, {
    method: 'PUT',
    body: todo

  })
  listsStore.setCurrentListTasks(data.value.todos)
  listsStore.setCurrentTask(todo)
  emit('selectTodo')
}

function openContextMenu () {
  showContextMenu.value = true
}

onMounted(async () => {
  // const { data } = await useFetch('/api/todo')

  // listsStore.setCurrentListTasks(data.value)
})

</script>

<template>
  <h1>{{ debug }}</h1>
  <v-text-field
    v-model="taskName"
    variant="solo-filled"
    rounded
    :placeholder="'Add task to ' + listsStore.currentList.name"
    @keyup.enter="addTask()"
  />
  <v-list :items="listsStore.currentList.todos" elevation="0" rounded>
    <v-list-subheader>Todo</v-list-subheader>
    <v-list-item
      v-for="(task, index) in listsStore.currentList.todos"
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
            @click="deleteTask(task.name, index)"
          >
            Delete
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>
