<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits(['setDate'])

const date = ref(new Date())

watch(date, (newDate) => {
  emit('setDate', newDate)
})

</script>
<template>
  <VueDatePicker
    v-model="date"
    :enable-time-picker="false"
  />
</template>
