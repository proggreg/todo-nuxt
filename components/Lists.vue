<script setup>
import { defineProps } from 'vue'
import { useListsStore } from '~/stores/lists';

const listsStore = useListsStore()

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
    <input
    v-model="list.name"
    class="rounded-xl"
    background-color="transparent" 
    placeholder="My List" 
    @input="cacheLists()"
    clearable
    density="compact"
    type="title"
    hide-details
    :variant="textFieldVariant"
    />
    <!-- <v-list-item-title>{{list.name}}</v-list-item-title> -->
    </v-list-item>
    </v-list>
</template>