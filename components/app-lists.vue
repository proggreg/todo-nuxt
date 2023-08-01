<script setup>
import { useListsStore } from '~/stores/lists'

const listsStore = useListsStore()
const emit = defineEmits(['selectList'])
const props = defineProps({
  lists: {
    type: Array,
    default () {
      return [
        {
          name: ''
        }
      ]
    }
  }
})

function selectList (list) {
  listsStore.setCurrentList(list)
  emit('selectList', list)
}
</script>

<template>
  <v-list nav>
    <v-list-item v-if="!props.lists.length">
      <v-title>No lists yet</v-title>
    </v-list-item>
    <v-list-item
      v-for="(list, i) in props.lists"
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
