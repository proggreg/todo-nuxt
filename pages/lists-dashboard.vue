<script setup>
import { ref } from "vue";
import { useListsStore } from "~/stores/lists";

const listsStore = useListsStore();

const { data } = await useAsyncData("lists", () => listsStore.lists);

const open = ref(false);

function newList() {
  listsStore.addList();
}

function openMobileNav() {
  open.value = !open.value;
}
</script>
<template>
  <v-row class="">
    <v-col class="rounded-lg" cols="12" md="4">
      <v-btn class="d-md-none" no-gutters @click="openMobileNav"> Lists </v-btn>
      <v-sheet
        class="pa-2 fill-height rounded-lg d-none d-xs-none d-sm-none d-md-flex"
      >
        <v-col cols="12">
          <v-btn color="green" @click="newList">New List</v-btn>
          <list-items v-if="data" :lists="data"></list-items>
        </v-col>
      </v-sheet>
      <mobile-lists-nav
        v-if="open"
        :open="open"
        :lists="listsStore.lists"
        @close="open = false"
      ></mobile-lists-nav>
    </v-col>
    <v-col class="fill-height">
      <v-sheet class="fill-height rounded-lg">
        <list-item></list-item>
      </v-sheet>
    </v-col>
  </v-row>
</template>
