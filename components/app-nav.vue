<script setup>
const open = useNav()
const dialog = ref(false)

</script>
<template>
  <v-navigation-drawer
    v-model="open"
    class="pa-2 fill-height"
  >
    <v-list>
      <v-btn elevation="0" rounded="lg" append-icon="mdi-home" width="100%" to="/">
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
