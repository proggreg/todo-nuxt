<script setup>
import { ref } from 'vue'
import { useListsStore } from '~/stores/lists'

const listsStore = useListsStore()

const { data } = await useAsyncData('lists', () => listsStore.lists)

const open = ref(false)

function newList () {
  if (!listsStore.currentList || listsStore.currentList.name) {
    listsStore.addList()
  }
}

function openMobileNav () {
  open.value = !open.value
}
</script>
<template>
  <v-row class="">
    <v-col class="rounded-lg" cols="12" md="2">
      <v-btn class="d-md-none" no-gutters @click="openMobileNav">
        Lists
      </v-btn>
      <v-sheet
        class="pa-2 fill-height rounded-lg d-none d-xs-none d-sm-none d-md-flex"
      >
        <v-row>
          <v-col cols="12">
            <v-btn rounded prepend-icon="mdi-plus" @click="newList">
              New List
            </v-btn>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <app-lists v-if="data" :lists="data" />
          </v-col>
        </v-row>
      </v-sheet>
      <mobile-lists-nav
        v-if="open"
        :open="open"
        :lists="listsStore.lists"
        @close="open = false"
      />
    </v-col>
    <v-col class="fill-height">
      <v-sheet class="fill-height rounded-lg">
        <app-list />
      </v-sheet>
    </v-col>
  </v-row>
</template>
