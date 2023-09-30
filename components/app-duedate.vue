<script setup lang="ts">
const store = useListsStore()
const dueDate = ref([new Date()])
function setDueDate () {
  console.log('set due date', dueDate.value)
  if (dueDate.value) {
    store.setDueDate(dueDate.value)
  }
}
</script>
<template>
  <v-menu :close-on-content-click="false">
    <template #activator="{props}">
      <v-btn variant="text" elevation="0" v-bind="props" icon="mdi-calendar" />
    </template>

    <v-card>
      <v-date-picker
        v-model="dueDate"
        input-mode="keyboard"
        format="dd/mm/yyyy"
        locale="en-GB"
        :hide-actions="true"
        @input="setDueDate"
      />
    </v-card>
  </v-menu>
</template>
