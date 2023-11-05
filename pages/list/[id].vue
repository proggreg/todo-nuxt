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
      <v-col cols="12" sm="6">
        <TodoNew />
        <ListView v-if="todos && currentList" :list-name="currentList.name" :todos="todos" />
      </v-col>
      <v-col class="fill-height d-none d-sm-block " cols="12" sm="5">
        <v-sheet class="fill-height  rounded-lg">
          <app-item-detail />
        </v-sheet>
      </v-col>
    </v-row>
  </client-only>
</template>
