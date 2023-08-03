<script setup>
import { reactive, ref } from 'vue'
import { useListsStore } from '~/stores/lists'

const itemRefs = ref([])
const inputRefs = ref([])
const newTaskDisabled = ref(false)
const listsStore = useListsStore()
const props = defineProps({
  list: {
    type: Object,
    default () {
      return {}
    }
  }
})

const showTodo = ref(false)

function validateTaskName (input) {
  newTaskDisabled.value = !input.target.value
}

watch(inputRefs.value, (newInputRefs) => {
  const input = newInputRefs[newInputRefs.length - 1]
  input.focus()
})

function addTask (list) {
  if (!list.tasks) {
    list.tasks = reactive([])
  }
  list.tasks.push({
    name: ''
  })
  newTaskDisabled.value = true
}

function deleteTask (list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1)
  }
}

function editTask (todo) {
  listsStore.setCurrentTask(todo)
  showTodo.value = true
}
</script>

<template>
  <app-list-item v-if="showTodo" @close="showTodo = false" />
  <v-list v-else :items="props.list.tasks" elevation="0" rounded>
    <v-list-subheader>Tasks</v-list-subheader>
    <v-list-item
      v-for="(task, index) in list.tasks"
      :key="index"
      ref="itemRefs"
      density="compact"
      variant="tonal"
    >
      <v-list-item-title>
        <v-text-field
          ref="inputRefs"
          v-model="task.name"
          :class="task.done ? 'text-decoration-line-through' : ''"
          :disabled="task.done"
          @input="validateTaskName"
        />
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
            color="yellow"
            @click="editTask(task)"
          >
            edit
          </v-btn>
          <v-btn
            variant="tonal"
            size="x-small"
            color="red"
            @click="deleteTask(list, index)"
          >
            Delete
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-list-item>
      <v-spacer />
      <template #append>
        <v-btn
          :disabled="
            !listsStore.currentList.name ? true : false || newTaskDisabled
          "
          size="x-small"
          @click="addTask(list, index)"
        >
          New Task
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>