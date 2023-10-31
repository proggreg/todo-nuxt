<script setup lang="ts">
const listName = ref('')
const listsStore = useListsStore()
const navOpen = useNav()

const props = defineProps<{open: boolean}>()
const emit = defineEmits(['close'])

async function newList () {
  const list = await listsStore.addList(listName.value)

  if (list) {
    listName.value = ''
    emit('close')
    navOpen.value = false
    await navigateTo(`/list/${list._id}`)
  }
}
</script>

<template>
  <app-dialog :open="props.open" @close="emit('close')">
    <template #open>
      <div class="d-flex justify-space-between">
        Lists
      </div>
    </template>
    <v-container>
      <v-text-field v-model="listName" placeholder="New List" @keyup.enter="newList" />
    </v-container>
    <template #buttons>
      <v-btn color="primary" @click="newList">
        Save
      </v-btn>
    </template>
  </app-dialog>
</template>
