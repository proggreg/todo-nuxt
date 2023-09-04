<script setup lang="ts">
const store = useListsStore()
const props = defineProps<{ listId: string}>()
function deleteList () {
  console.log('delete list', props.listId)
  store.deleteList(props.listId)
}
const options = reactive([{
  name: 'Delete',
  handler: deleteList
}])
</script>
<template>
  <v-menu>
    <template #activator="{props}">
      <v-icon v-bind="props">
        mdi-dots-horizontal
      </v-icon>
    </template>
    <v-list>
      <v-list-item
        v-for="(option, index) in options"
        :key="index"
        :value="option.name"
        @click="option.handler"
      >
        <v-list-item-title>{{ option.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
