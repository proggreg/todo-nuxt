<script setup lang="ts">
// const date = useDate()
const emit = defineEmits(['setDate'])
const open = ref(false)
const dueDateProps = defineProps<{todoDueDate?: Date | string, todo: Todo, showDetail?: boolean}>()
const dueDate = ref([''])

watch(dueDate, (dueDate) => {
  emit('setDate', dueDate, dueDateProps.todo)
})

const formattedDate = computed(() => {
  if (dueDateProps.todoDueDate) {
    return new Date(dueDateProps.todoDueDate).toLocaleDateString('en-GB')
  }
})

// TODO updateDueDate
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateDueDate (newDate: Date, todo: Todo) {
  todo.dueDate = newDate
  $fetch(`/api/list/todo/${todo._id}`, {
    method: 'PUT',
    body: todo
  })
}

</script>
<template>
  <v-menu :close-on-content-click="false" :model-value="open">
    <template #activator="{props}">
      <v-text-field
        v-if="dueDateProps.showDetail"
        v-bind="props"
        style="min-width: 160px"
        placeholder="date"
        class="text-h6"
        :value="formattedDate"
        append-icon="mdi-calendar"
        hide-details
        @click="open = !open"
      />
      <v-btn v-else v-bind="props" icon="mdi-calendar" variant="text" @click="open = !open" />
    </template>
    <v-list>
      <v-date-picker v-model="dueDate" rounded="lg" @click:save="open = !open" @click:cancel="open = !open" />
    </v-list>
  </v-menu>
</template>
