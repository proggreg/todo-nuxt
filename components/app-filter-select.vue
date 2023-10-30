<script setup lang="ts">
import { useListsStore } from '~/stores/lists'
const listsStore = useListsStore()
const items = ref(['Today'])
const value = ref('')
watch(value, () => {
  console.log('filter val', value)
  if (value.value === 'Today') {
    listsStore.filterTodos('Today')
  }
})
</script>
<template>
  <v-select v-model="value" label="fitler" :items="items" />
</template>
