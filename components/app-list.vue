<script setup>
import { useListsStore } from '~/stores/lists'

const listTitle = ref(false)

const listsStore = useListsStore()

const emit = defineEmits(['todoSelected'])

function updateListName () {
  console.log('update list name', listsStore.currentList.name)
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
onUpdated(() => {
  listTitle.value.focus()
})
</script>
<template>
  <v-row v-if="listsStore.currentList" no-gutters>
    <v-col cols="12">
      <v-text-field
        ref="listTitle"
        v-model="listsStore.currentList.name"
        rounded
        class="font-weight-bold"
        variant="underlined"
        @input="updateListName"
      />
    </v-col>
    <v-col>
      <app-list-items
        v-if="listsStore.currentList"
        @select-todo="emit('todoSelected')"
      />
    </v-col>
  </v-row>
</template>
