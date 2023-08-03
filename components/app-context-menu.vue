<script setup>

const props = defineProps({
  menuItems: {
    type: Array,
    default: function () {
      return []
    }
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
})

onUpdated(() => {
  console.log('updated')
})
</script>
<template>
  <v-menu>
    <v-list>
      <v-list-item v-for="menuItem in props.menuItems" :key="menuItem">
        <v-list-item-title>{{ menuItem.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
