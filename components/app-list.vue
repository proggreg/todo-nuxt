<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
const store = useListsStore()
const list = computed(() => store.currentList)

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
  <v-row v-if="list" no-gutters>
    <v-col class="py-4" cols="12">
      <h1>
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
