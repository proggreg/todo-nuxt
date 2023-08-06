<script setup>
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useListsStore } from '~/stores/lists'

const { width } = useWindowSize()
const listsStore = useListsStore()
const { data } = await useAsyncData('lists', () => listsStore.lists)
const drawer = ref(false)
const desktopNavOpen = ref(true)
const dialog = ref(false)

function newList () {
  if (!listsStore.currentList || listsStore.currentList.name) {
    listsStore.addList()
  }
  if (width.value < 1280) { // https://vuetifyjs.com/en/styles/spacing/#breakpoints
    drawer.value = false
  }
}

if (process.browser) {
  if (width.value >= 1280) {
    drawer.value = true
  }
}

function openMobileNav () {
  drawer.value = !drawer.value
}

function updateDrawer (el) {
  desktopNavOpen.value = !el
}
function todoSelected () {
  if (width.value < 600) {
    dialog.value = true
  }
}

onMounted(() => {
  if (width.value >= 1280) {
    drawer.value = true
  }
})
</script>
<template>
  <client-only>
    <v-row>
      <v-navigation-drawer
        v-model="drawer"
        app
        class="pa-2 fill-height"
        @update:rail="updateDrawer"
      >
        <v-list>
          <v-list-item>
            <template #prepend>
              <v-btn rounded @click="newList">
                <template #prepend>
                  <v-icon>mdi-plus</v-icon>
                </template>
                New List
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-divider />
        <app-lists v-if="data" :lists="data" />
      </v-navigation-drawer>
      <v-col class="rounded-lg d-lg-none" cols="12" md="1">
        <v-btn class="" no-gutters @click="openMobileNav">
          Lists
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <app-list @todoSelected="todoSelected()" />
      </v-col>
      <v-col class="fill-height d-none d-sm-block " cols="12" sm="5">
        <v-dialog v-model="dialog">
          <v-sheet class="fill-height rounded-lg">
            <app-list-item />
          </v-sheet>
        </v-dialog>
        <v-sheet class="fill-height  rounded-lg">
          <app-list-item />
        </v-sheet>
      </v-col>
    </v-row>
  </client-only>
</template>
