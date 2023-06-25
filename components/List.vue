<script setup>
import { useListsStore } from '~/stores/lists';

const listsStore = useListsStore()
</script>
<template>
     <v-row v-if="listsStore.currentList" no-gutters>
            <v-col cols="12">
               <v-text-field variant="solo-filled" v-model="listsStore.currentList.name"/>
            </v-col>
            <v-col>
              <Todos v-if="listsStore.currentList" :list="listsStore.currentList"></Todos>
            </v-col>
          </v-row>
</template>