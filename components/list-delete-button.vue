<script setup lang="ts">
const store = useListsStore()
const props = defineProps<{
  _id: string
}>()
const listid = computed(() => props._id)
function deleteList () {
  $fetch(`/api/list/${props._id}`, {
    method: 'DELETE'
  })
  store.removeList(listid)
}
</script>
<template>
  <v-btn color="red" @click="deleteList">
    Delete
  </v-btn>
</template>
