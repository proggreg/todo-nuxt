<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { Todo } from '@/types/globals'
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits(['setDate'])

const props = defineProps<{date: Date, todo: Todo}>()

</script>
<template>
  <VueDatePicker
    auto-apply
    :model-value="props.date"
    :enable-time-picker="false"
    width="50"
    @update:model-value="(newDate) => emit('setDate', newDate, props.todo)"
  />
</template>
