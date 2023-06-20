<script setup>
import { defineProps, defineEmits } from 'vue'
import { useListsStore } from '~/stores/lists';

const listsStore = useListsStore()
const emit= defineEmits(['selectList'])

  const props = defineProps({
    lists: Array
  })

  function showTasks(list) {
    console.log('show tasks', list)
  }

  function cacheLists() {
    console.debug('cache lists')
  }
  function selectList(list) {
    console.log("selectList", list)
    listsStore.setCurrentList(list)
    emit('selectList', list)
  }
</script>

<template>
 <v-list>
    <v-list-item
      v-for="(list, i) in lists"
      :key="i"
      color="accent"
      rounded="xl"
      fluid
      :value="i"
      @click="selectList(list)"
    >
    <v-title>{{ list.name }}</v-title>
    </v-list-item>
    </v-list>
</template>