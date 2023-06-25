<script setup>
import { useListsStore } from '~/stores/lists';
const listsStore = useListsStore()
const emit = defineEmits('close')

function closeTask(params) {
  emit('close')
  if (!listsStore.currentList.tasks[listsStore.currentList.tasks.length - 1].name) {
    listsStore.currentList.tasks.pop()
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="listsStore.currentTask.name">
      </v-text-field>
    </v-card-title>
    <v-card-item>
    <v-textarea label="description" 
      variant="solo-inverted"
      v-model="listsStore.currentTask.desc"
    ></v-textarea>
  </v-card-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-file-input label="File input" variant="solo-inverted" density="compact" hide-details></v-file-input>
      <v-btn color="error" @click="closeTask">Close</v-btn>
    </v-card-actions>
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
