import { defineProps } from 'vue'
<script setup>
  const props = defineProps({
    open: Boolean
  })
</script>
<template>
  <div>
    <v-navigation-drawer v-if="props.open">
  </v-navigation-drawer>
  </div>

</template>