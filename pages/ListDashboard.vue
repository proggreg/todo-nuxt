
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
        <v-row>
          <v-btn
          color="accent"
          class="d-md-none"
          @click="openMobileNav"
        >
          Lists
        </v-btn>  
        </v-row>
        
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
        <v-sheet class="fill-height rounded-lg pa-2">
          <v-row v-if="listsStore.currentList">
            <v-col cols="12">
               <h2><input placeholder="My List" class="primary" color="primary" v-model="listsStore.currentList.name"/></h2>
            </v-col>
            <v-col>
              <Todos v-if="listsStore.currentList" :list="listsStore.currentList"></Todos>
            </v-col>
          </v-row>
            

        </v-sheet>
      </v-col>
    </v-row>
</template>

