<script setup lang="ts">
const size = useWindowSize()
const dialogProps = defineProps<{
  title?: string,
  open?: boolean
}>()
const emit = defineEmits(['close'])

</script>

<template>
  <v-dialog max-width="50vw" :model-value="dialogProps.open" :fullscreen="size.width.value <= 400" transition="dialog-bottom-transition">
    <template #activator>
      <slot name="open" />
    </template>

    <v-card>
      <slot />
      <v-card-actions>
        <v-btn @click="emit('close')">
          Close
        </v-btn>
        <slot name="buttons" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
