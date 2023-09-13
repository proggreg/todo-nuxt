<script setup>
import { useListsStore } from '~/stores/lists'
const props = defineProps({
  drawer: Boolean
})

const listName = ref('')
const listsStore = useListsStore()

const dialog = ref(false)
function newList () {
  listsStore.addList(listName.value)

  listName.value = ''
  dialog.value = false
}

</script>
<template>
  <v-navigation-drawer
    :model-value="props.drawer"

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
            <dialog-list-new />

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
