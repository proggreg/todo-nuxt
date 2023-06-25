
<script setup>
import {ref} from 'vue'
import { useListsStore } from '~/stores/lists';

const listsStore = useListsStore()
const open = ref(false)

function newList() {
  listsStore.addList()
}

function openMobileNav() {
  open.value = !open.value ;
}

</script>
<template>
    <v-row class="">
      <v-col class="rounded-lg" cols="12" md="4">

          <v-btn
          color="accent"
          class="d-md-none"
          @click="openMobileNav"
          no-gutters
          >
          Lists
          </v-btn>  
        <v-sheet class="pa-2 fill-height rounded-lg d-none d-xs-none d-sm-none d-md-flex">
          <v-col cols="12">
          <v-btn @click="newList">New List</v-btn>
        </v-col>
        <v-col cols="12">
          <Lists :lists="listsStore.lists"></Lists>
        </v-col>
        </v-sheet>
        <MobileListsNav v-if="open" :open="open" @close="open = false" :lists="lists"></MobileListsNav>
      </v-col>
      <v-col class="fill-height">
        <v-sheet class="fill-height rounded-lg">
          <List></List>
        </v-sheet>
      </v-col>
    </v-row>
</template>

