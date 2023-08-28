<script setup>
import { useListsStore } from '~/stores/lists'

const { data: lists } = await useFetch('/api/lists')

const listsStore = useListsStore()
const emit = defineEmits(['selectList'])

function selectList (list) {
  listsStore.setCurrentList(list)
  emit('selectList', list)
}
</script>

<template>
  <v-list nav>
    <v-list-item v-if="!lists || !lists.length">
      <v-list-item-title>No lists yet</v-list-item-title>
    </v-list-item>
    <v-list-item
      v-for="(list, i) in lists"
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
    </v-list-item>
  </v-list>
</template>
