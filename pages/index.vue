<script setup lang="ts">
const listsStore = useListsStore()

useHead({ title: 'TickUp:Home' })

</script>

<template>
  <div>
    <TodoNew />
    <ListView v-if="listsStore.todos" :todos="listsStore.todos" list-name="Today" />
  </div>
</template>
