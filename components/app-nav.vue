<script setup lang="ts">
// const open = useNav()
const open = ref(false)
const dialog = ref(false)
const listsStore = useListsStore()
const { width } = useWindowSize()

function refreshToday () {
  listsStore.getTodaysTodos()
  if (!listsStore.todaysTodos) { return }
  listsStore.setCurrentList({
    name: 'today',
    todos: listsStore.todaysTodos
  })
}
listsStore.getLists()

</script>
<template>
  <v-col cols="1" class="d-lg-none">
    <v-btn icon="mdi-format-list-bulleted" @click="open = !open" />
  </v-col>

  <v-navigation-drawer
    v-model="open"
    class="pa-2 fill-height"
  >
    <v-list>
      <v-spacer />
      <v-btn
        elevation="0"
        rounded="lg"
        append-icon="mdi-home"
        width="100%"
        to="/"
      >
        Today
      </v-btn>

      <v-list-item>
        <template #append>
          <v-btn elevation="0" rounded="lg" icon="mdi-plus" @click="dialog = true" />
        </template>
        <template #prepend>
          <dialog-list-new :open="dialog" @close="dialog = false" />
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <app-lists />
  </v-navigation-drawer>
</template>
