<script setup>
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()

const emit = defineEmits(['todoSelected'])

function updateListName () { // TODO use edit button to edit title
  if (listsStore.currentList.name) {
    $fetch('/api/list/update', {
      method: 'PUT',
      body: {
        name: listsStore.currentList.name,
        _id: listsStore.listId
      }
    })
  }
}
</script>
<template>
  <v-row v-if="listsStore.currentList" no-gutters>
    <v-col cols="12">
      <h1>
        {{ listsStore.currentList.name }}
      </h1>
    </v-col>
    <v-col>
      <app-list-items
        v-if="listsStore.currentList"
        @select-todo="emit('todoSelected')"
      />
    </v-col>
    <v-col cols="2" class="pa-4">
      <list-delete-button :_id="listsStore.currentList._id" />
    </v-col>
  </v-row>
</template>
