<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const store = useListsStore()
const date = ref(new Date())

const format = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

function setDueDate () {
  if (date.value) {
    store.setDueDate(date.value)
  }
}

</script>
<template>
  <VueDatePicker v-model="date" :format="format" @closed="setDueDate" />
</template>
