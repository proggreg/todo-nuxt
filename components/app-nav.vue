<script setup>
import { useWindowSize } from '@vueuse/core'
import { useListsStore } from '~/stores/lists'
const drawer = ref(true)
const listName = ref('')
const listsStore = useListsStore()
const { width } = useWindowSize()
const dialog = ref(false)
function newList () {
  listsStore.addList(listName.value)

  listName.value = ''
  dialog.value = false
}

onMounted(() => {
  if (width.value >= 1280) {
    drawer.value = true
  }
})
</script>
<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    class="pa-2 fill-height"
  >
    <v-list>
      <v-list-item>
        <template #prepend>
          <app-dialog :open="dialog" @close="dialog = false">
            <template #open>
              <v-btn
                color="green"
                @click="dialog = true"
              >
                New List
              </v-btn>
            </template>

            <v-text-field v-model="listName" placeholder="New List" @keyup.enter="newList" />
            <template #buttons>
              <v-btn color="primary" @click="newList">
                Save
              </v-btn>
            </template>
          </app-dialog>
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <app-lists />
  </v-navigation-drawer>
</template>
