<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useListsStore } from '@/stores/lists'
const route = useRoute()
const dialog = ref(false)
const { smAndDown } = useDisplay()
const listsStore = useListsStore()
listsStore.getList(route.params.id)
listsStore.getTodos(route.params.id)

console.log(listsStore.currentList.todos)

function todoSelected () {
  if (smAndDown.value) {
    dialog.value = true
  }
}

</script>
<template>
  <client-only>
    <v-row>
      <v-col cols="12" sm="6">
        <app-list @todoSelected="todoSelected" />
        <app-list-items :items="listsStore.currentList.todos" />
      </v-col>
      <v-col class="fill-height d-none d-sm-block " cols="12" sm="5">
        <v-sheet class="fill-height  rounded-lg">
          <app-item-detail />
        </v-sheet>
      </v-col>
    </v-row>
  </client-only>
</template>
