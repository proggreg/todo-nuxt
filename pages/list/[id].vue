<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useListsStore } from '@/stores/lists'
const { params } = useRoute()
const dialog = ref(false)
const { smAndDown } = useDisplay()
const listsStore = useListsStore()
try {
  listsStore.getList(params.id[0])
  listsStore.getTodos()
} catch (error) {
  await navigateTo('/')
}

function todoSelected () {
  if (smAndDown.value) {
    dialog.value = true
  }
}

</script>
<template>
  <client-only>
    <v-row>
      <v-col v-if="listsStore.currentList" cols="12" sm="6">
        <app-list @todo-selected="todoSelected" />
        <app-list-items v-if="listsStore.currentList.todos" :list-name="listsStore.currentList.name" :todos="listsStore.currentList.todos" />
      </v-col>
      <v-col class="fill-height d-none d-sm-block " cols="12" sm="5">
        <v-sheet class="fill-height  rounded-lg">
          <app-item-detail />
        </v-sheet>
      </v-col>
    </v-row>
  </client-only>
</template>
