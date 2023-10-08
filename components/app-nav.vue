<script setup lang="ts">
const open = useNav()
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
  <v-app-bar v-if="width < 1280" :flat="true">
    <v-col cols="1" class="d-lg-none">
      <v-icon @touchstart="open = true" @mouseover="open = true">
        mdi-format-list-bulleted
      </v-icon>
    </v-col>
  </v-app-bar>
  <v-navigation-drawer
    v-model="open"
    class="pa-2 fill-height"
  >
    <v-list>
      <v-btn
        elevation="0"
        rounded="lg"
        append-icon="mdi-home"
        width="100%"
        to="/"
        @click="refreshToday"
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
