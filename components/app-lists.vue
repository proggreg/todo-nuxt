<script setup>
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()

function selectList (list) {
  listsStore.setCurrentList(list)
  listsStore.getTodos(list._id)
}
onMounted(() => {
  listsStore.getLists() // TODO get on server (useFetch)
})
</script>

<template>
  <v-list nav>
    <v-list-item v-if="!listsStore.lists || !listsStore.lists.length">
      <v-list-item-title>No lists yet</v-list-item-title>
    </v-list-item>
    <v-list-item
      v-for="(list, i) in listsStore.lists"
      v-else
      :key="i"
      color="accent"
      rounded="xl"
      fluid
      :value="i"
      placeholder="My List"
      @click="selectList(list)"
    >
      <v-list-item-title>{{ list.name }}</v-list-item-title>
      <template #append>
        <options-menu :list-id="list._id" />
      </template>
    </v-list-item>
  </v-list>
</template>
