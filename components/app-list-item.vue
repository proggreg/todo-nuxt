<script setup>
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()

</script>

<template>
  <v-card v-if="listsStore.currentTask">
    <v-card-title>
      <v-text-field
        v-model="listsStore.currentTask.name"
        :class="
          listsStore.currentTask.done ? 'text-decoration-line-through' : ''
        "
        :disabled="listsStore.currentTask.done"
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
