<script setup>
import { useDisplay } from 'vuetify'
import { useListsStore } from '~/stores/lists'

const { smAndDown } = useDisplay()
const listsStore = useListsStore()
const navOpen = useNav()

function selectList (list) {
  listsStore.setCurrentList(list)
  console.log(smAndDown.value)
  if (smAndDown.value) {
    console.log('close navigation')
    navOpen.value = false
  }
}

</script>

<template>
  <v-list>
    <v-list-item v-if="!listsStore.lists || !listsStore.lists.length">
      <v-list-item-title>No lists yet</v-list-item-title>
    </v-list-item>
    <v-list-item
      v-for="(list, i) in listsStore.lists"
      v-else
      :key="i"
      color="accent"
      rounded="lg"
      fluid
      :value="i"
      placeholder="My List"
      @click="selectList(list)"
    >
      <nuxt-link class="nuxt-link" :to="`/list/${list._id}`">
        <v-list-item-title>{{ list.name }}</v-list-item-title>
      </nuxt-link>
      <template #append>
        <options-menu :list-id="list._id" />
      </template>
    </v-list-item>
  </v-list>
</template>
<style scoped>
.nuxt-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>
