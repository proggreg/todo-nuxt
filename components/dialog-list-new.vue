<script setup>
const listName = ref('')
const listsStore = useListsStore()
function newList () {
  listsStore.addList(listName.value)

  listName.value = ''
  dialog.value = false
}
</script>

<template>
  <v-container>
    <v-text-field v-model="listName" placeholder="New List" @keyup.enter="newList" />
  </v-container>
</template>
