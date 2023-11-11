<script setup lang="ts">
const { params } = useRoute()
const dialog = ref(false)
const { smAndDown } = useDisplay()
const { data: currentList } = await useFetch<List>(`/api/list/${params.id}`)
const { data: todos } = await useFetch<Todo[]>(`/api/list/todo/${params.id}`)

if (!currentList) {
  navigateTo('/')
}

function todoSelected () {
  if (smAndDown.value) {
    dialog.value = true
  }
}

if (currentList.value) {
  useHead({
    title: 'TickUp:' + currentList.value.name
  })
}

</script>
<template>
  <client-only>
    <v-row>
      <v-col>
        <TodoNew />
        <ListView v-if="todos && currentList" :list-name="currentList.name" :todos="todos" />
      </v-col>
    </v-row>
  </client-only>
</template>
