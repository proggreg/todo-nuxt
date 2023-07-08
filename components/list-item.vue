<script setup>
import { useListsStore } from "~/stores/lists";

const listsStore = useListsStore();

onMounted(() => {
  // debugger;
  // this.listTitle.focus();
});
</script>
<template>
  <v-row v-if="listsStore.currentList" no-gutters>
    <v-col cols="12">
      <v-text-field
        v-model="listsStore.currentList.name"
        variant="solo-filled"
      />
    </v-col>
    <v-col>
      <todo-items
        v-if="listsStore.currentList"
        :list="listsStore.currentList"
      ></todo-items>
    </v-col>
  </v-row>
</template>
