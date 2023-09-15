<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
const store = useListsStore()
const list = computed(() => {
  if (!store.currentList) {
    store.setCurrentList(store.lists[0])
    return store.lists[0]
  }
  return store.currentList
})
const open = useNav()

// function updateListName () { // TODO use edit button to edit title
//   if (store.currentList.name) {
//     $fetch('/api/list/update', {
//       method: 'PUT',
//       body: {
//         name: store.currentList.name,
//         _id: store.listId
//       }
//     })
//   }
// }
</script>
<template>
  <v-row v-if="list" no-gutters class="py-4">
    <v-col cols="1" class="d-lg-none">
      <v-icon @touchstart="open = true" @mouseover="open = true">
        mdi-format-list-bulleted
      </v-icon>
    </v-col>
    <v-col cols="11">
      <h1 class="text-h4">
        {{ list.name }}
      </h1>
    </v-col>
    <v-col>
      <app-list-items
        v-if="list"
      />
    </v-col>
  </v-row>
</template>
