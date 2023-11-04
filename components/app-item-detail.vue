<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()

function updateDueDate (newDate: Date) {
  listsStore.currentTodo.dueDate = newDate
  listsStore.updateTodo(listsStore.currentTodo)
}
function updateName () {
  listsStore.updateTodo(listsStore.currentTodo)
}

// TODO editDone
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function editDone () {
  listsStore.currentTodo.status = 'Done'
  listsStore.updateTodo(listsStore.currentTodo)
}

</script>

<template>
  <v-card v-if="listsStore.currentTodo" style="position: relative;">
    <template #prepend>
      <!-- TODO change to update status <v-checkbox-btn v-model="listsStore.currentTodo.done" @click="editDone(todo)" /> -->
    </template>
    <template #append>
      <app-duedate :date="listsStore.currentTodo.dueDate" :todo="listsStore.currentTodo" :show-detail="true" @set-date="updateDueDate" />
    </template>
    <v-card-title>
      <v-text-field
        v-model="listsStore.currentTodo.name"
        @input="updateName"
      />
    </v-card-title>
    <v-card-item>
      <v-textarea
        v-model="listsStore.currentTodo.desc"
        label="description"
        variant="solo-inverted"
      />
    </v-card-item>

    <v-card-actions>
      <v-spacer />
      <v-file-input
        label="File input"
        variant="solo-inverted"
        density="compact"
        hide-details
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
