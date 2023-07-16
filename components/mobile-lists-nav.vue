<script setup>
import { defineProps, defineEmits } from "vue";

import { useListsStore } from "~/stores/lists";
const props = defineProps({
  open: Boolean,
  lists: {
    type: Array,
    default() {
      return [];
    },
  },
});
const emit = defineEmits(["close"]);
const listsStore = useListsStore();

function newList() {
  listsStore.addList();
  emit("close", false);
}
function selectList() {
  emit("close", false);
}
</script>
<template>
  <v-navigation-drawer :model-value="props.open">
    <list-items
      :lists="listsStore.lists"
      @select-list="selectList"
    ></list-items>
    <template #append>
      <div class="pa-2">
        <v-btn @click="newList">New List</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
