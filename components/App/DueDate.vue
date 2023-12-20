<script setup lang="ts">
const emit = defineEmits(['setDate'])
const open = ref(false)
const dueDateProps = defineProps<{ todoDueDate?: Date | string, todo: Todo, showDetail?: boolean }>()

const formattedDate = computed(() => {
  if (dueDateProps.todoDueDate) {
    return new Date(dueDateProps.todoDueDate).toLocaleDateString('en-GB')
  }
})

function updateDueDate(newDate: Date) {
  console.log('updateDueDate', newDate)
  console.log(dueDateProps.todo)
  let newTodo = Object.assign({}, dueDateProps.todo)
  newTodo.dueDate = newDate

  emit('setDate', newDate, newTodo)
}

</script>
<template>
  <v-menu :close-on-content-click="false" :model-value="open">
    <template #activator="{ props }">
      <v-text-field v-if="dueDateProps.showDetail" v-bind="props" style="min-width: 160px" placeholder="date"
        class="text-h6" :value="formattedDate" append-icon="mdi-calendar" hide-details @click="open = !open" />
      <v-btn v-else v-bind="props" icon="mdi-calendar" variant="text" @click="open = !open" />
    </template>
    <v-list>
      <v-date-picker @update:model-value="(val) => updateDueDate(val)" rounded="lg" @click:save="open = !open"
        @click:cancel="open = !open" />
    </v-list>
  </v-menu>
</template>
