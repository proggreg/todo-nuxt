<script setup>
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()

function updateDueDate (newDate) {
  listsStore.updateTodo({
    _id: listsStore.currentTask._id,
    dueDate: newDate
  })
}
function updateName () {
  listsStore.updateTodo({
    _id: listsStore.currentTask._id,
    name: listsStore.currentTask.name
  })
}
function editDone () {
  listsStore.updateTodo({
    _id: listsStore.currentTask._id,
    done: listsStore.currentTask.done
  })
}

</script>

<template>
  <v-card v-if="listsStore.currentTask" style="position: relative;">
    <template #prepend>
      <v-checkbox-btn v-model="listsStore.currentTask.done" @click="editDone(todo)" />
    </template>
    <template #append>
      <app-duedate :date="listsStore.currentTask.dueDate" :todo="listsStore.currentTask" :show-detail="true" @set-date="updateDueDate" />
    </template>
    <v-card-title>
      <v-text-field
        v-model="listsStore.currentTask.name"
        :class="
          listsStore.currentTask.done ? 'text-decoration-line-through' : ''
        "
        :disabled="listsStore.currentTask.done"
        @input="updateName"
      />
    </v-card-title>
    <v-card-item>
      <v-textarea
        v-model="listsStore.currentTask.desc"
        label="description"
        variant="solo-inverted"
        :disabled="listsStore.currentTask.done"
      />
    </v-card-item>

    <v-card-actions>
      <v-spacer />
      <v-file-input
        label="File input"
        variant="solo-inverted"
        density="compact"
        hide-details
        :disabled="listsStore.currentTask.done"
      />
    </v-card-actions>
  </v-card>
  <v-card v-else>
    <v-card-title>
      Select a task to view details
    </v-card-title>
  </v-card>
</template>

<style scoped>
.v-file-input {
  flex-grow: 0;
}
:deep(.v-file-input .v-input__control) {
  display: none;
}
</style>
