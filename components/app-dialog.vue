<script setup lang="ts">
const dialog = ref(false)
const size = useWindowSize()

</script>

<template>
  <v-dialog v-model="dialog" :fullscreen="size.width.value <= 400" transition="dialog-bottom-transition">
    <template #activator="{ props }">
      <v-btn
        color="primary"
        v-bind="props"
      >
        Open Dialog
      </v-btn>
    </template>

    <v-card>
      <v-card-actions>
        <v-btn @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
      <slot />
    </v-card>
  </v-dialog>
</template>
