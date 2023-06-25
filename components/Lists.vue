<script setup>
  import { defineProps, defineEmits } from 'vue'
  import { useListsStore } from '~/stores/lists';

  const listsStore = useListsStore()
  const emit= defineEmits(['selectList'])
  const props = defineProps({
    lists: Array
  })

  function selectList(list) {
    listsStore.setCurrentList(list)
    emit('selectList', list)
  }
</script>

<template>
 <v-list>
    <v-list-item v-if="!lists.length">No lists yet :(</v-list-item>
    <v-list-item v-else
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