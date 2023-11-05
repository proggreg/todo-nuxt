<script setup lang="ts">
const listsStore = useListsStore()

useHead({ title: 'TickUp:Home' })

</script>

<template>
  <TodoNew />
  <ListView v-if="listsStore.todos" :todos="listsStore.todos" list-name="Today" />
</template>
