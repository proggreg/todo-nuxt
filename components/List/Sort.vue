<script setup lang="ts">
const selectedSort = ref(null)
const sortOptions = ref([
  { text: 'Default', value: 'default' },
  { text: 'Priority', value: 'priority' },
  { text: 'Due Date', value: 'dueDate' }
])
</script>

<template>
  <v-select
    v-model="selectedSort"
    :items="sortOptions"
    item-title="text"
    item-value="value"
    label="Sort By"
    outlined
  />
</template>
