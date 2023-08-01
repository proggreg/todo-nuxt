<script setup>
import { ref } from 'vue'
import { useListsStore } from '~/stores/lists'

const listsStore = useListsStore()

const { data } = await useAsyncData('lists', () => listsStore.lists)

const open = ref(false)
const desktopNavOpen = ref(true)
const rail = ref(false)

function newList () {
  rail.value = false
  listsStore.addList()
}

function openMobileNav () {
  open.value = !open.value
}

function updateDrawer (el) {
  desktopNavOpen.value = !el
}
</script>
<template>
  <v-row class="">
    <v-navigation-drawer
      app
      class="pa-2 fill-height rounded-lg d-none d-md-flex"
      @update:rail="updateDrawer"
    >
      <v-list>
        <v-list-item density="comfortable">
          <v-btn rounded @click="newList">
            <template #prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            New List
          </v-btn>
        </v-list-item>
      </v-list>
      <v-divider />
      <app-lists v-if="data" :lists="data" />
    </v-navigation-drawer>
    <v-col class="rounded-lg d-lg-none" cols="1">
      <v-btn class="" no-gutters @click="openMobileNav">
        Lists
      </v-btn>
    </v-col>
    <v-col>
      <app-list />
    </v-col>
    <v-col class="fill-height">
      <v-sheet class="fill-height rounded-lg">
        <app-list-item />
      </v-sheet>
    </v-col>
  </v-row>
</template>
