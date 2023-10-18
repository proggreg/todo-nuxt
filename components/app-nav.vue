<script setup lang="ts">
const open = useNav()
const dialog = ref(false)
const listsStore = useListsStore()

listsStore.getLists()

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="1" class="d-flex d-lg-none align-center">
        <v-btn size="small" style="padding: 0;" elevation="0" @click="open = !open">
          <v-icon class="text-h4" size="x-large">
            mdi-format-list-bulleted
          </v-icon>
        </v-btn>
      </v-col>
      <v-spacer />

      <v-col cols="1">
        <darkmode-switch />
      </v-col>
    </v-row>
  </v-container>

  <v-navigation-drawer
    v-model="open"
    class="pa-2 fill-height"
  >
    <v-list>
      <v-spacer />
      <v-btn
        elevation="0"
        rounded="lg"
        append-icon="mdi-home"
        width="100%"
        to="/"
      >
        Today
      </v-btn>

      <v-list-item>
        <template #append>
          <v-btn elevation="0" rounded="lg" icon="mdi-plus" @click="dialog = true" />
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
