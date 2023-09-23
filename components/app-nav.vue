<script setup>
import { useListsStore } from '~/stores/lists'
// const props = defineProps({
//   drawer: Boolean
// })
const open = useNav()
const dialog = ref(false)

</script>
<template>
  <v-navigation-drawer
    v-model="open"

    class="pa-2 fill-height"
  >
    <v-list>
      <v-list-item>
        <template #append>
          <v-icon @click="dialog = true">
            mdi-plus
          </v-icon>
        </template>
        <template #prepend>
          <dialog-list-new :open="dialog" @close="dialog = false" />
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <app-lists />
  </v-navigation-drawer>
</template>
