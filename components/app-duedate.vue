<script setup lang="ts">
import { useDate } from 'vuetify/labs/date'
import { Todo } from '@/types/globals'

// eslint-disable-next-line vue/no-dupe-keys
const date = useDate()
const { width } = useWindowSize()
const emit = defineEmits(['setDate'])
const open = ref(false)
const dueDateProps = defineProps<{date?: Date | string, todo?: Todo, showDetail?: boolean}>()
const dueDate = ref('')

watch(dueDate, (dueDate) => {
  emit('setDate', dueDate, dueDateProps.todo)
})

const formattedDate = computed(() => {
  if (!dueDateProps.date) { return '' }

  console.log('date prop', dueDateProps.date)

  return date.format(new Date(dueDateProps.date), 'keyboardDate')
})

</script>
<template>
  <v-menu :close-on-content-click="false" :model-value="open">
    <template #activator="{props}">
      <v-text-field
        v-if="dueDateProps.showDetail"
        v-bind="props"
        style="min-width: 160px"
        placeholder="date"
        size="small"
        class="text-h6"
        :value="formattedDate"
        append-icon="mdi-calendar"
        hide-details
        @click="open = !open"
      />
      <v-btn v-else v-bind="props" icon="mdi-calendar" variant="text" @click="open = !open" />
    </template>
    <v-list>
      {{ dueDate }}
      <v-date-picker v-model="dueDate" rounded="lg" @click:save="open = !open" @click:cancel="open = !open" />
    </v-list>
  </v-menu>
</template>
<!-- TODO use container query to show/hide text field -->
