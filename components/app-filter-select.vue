<script setup lang="ts">
// import { useListsStore } from '~/stores/lists'
// const listsStore = useListsStore()
const items = ref([''])
const value = ref('')

// TODO finish component

</script>
<template>
  <v-select v-model="value" label="filter" :items="items" />
</template>
