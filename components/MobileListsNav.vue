<script setup>
  import { defineProps, defineEmits } from 'vue'
  const props = defineProps({
    open: Boolean,
    lists: Array
  })
  const emit = defineEmits(['close'])
  
  import { useListsStore } from '~/stores/lists';
  const listsStore = useListsStore()

  console.log(props)

  function newList() {
    emit('close', false);
    listsStore.addList()
    console.log(listsStore.lists)
    listsStore.setCurrentList(listsStore.lists[listsStore.lists.length - 1])
  }
  function test(list) {
    console.log("test", list)
    emit('close', false);
  }

  onUpdated((a) => console.log(a))
</script>
<template>
  
  <v-navigation-drawer :model-value="props.open">
      <lists @selectList="test" :lists="listsStore.lists"></lists>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="primary" @click="newList" >New List</v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>