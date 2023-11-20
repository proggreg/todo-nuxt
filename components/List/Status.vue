<script setup lang="ts">
const { statuses } = useSettingsStore()
const statusProps = defineProps<{todo: Todo}>()
function getStatusColor (todoStatus: string) {
  console.log(todoStatus)
  console.log(statuses)
  const status = statuses.filter(status => status.name === todoStatus)
  if (status.length > 0) {
    console.log(status)
    return status[0].color
  }
}
</script>
<template>
  <div
    class="status-icon"
    :style="{
      backgroundColor: getStatusColor(statusProps.todo.status)
    }"
  />
</template>
<style scoped>
.status-icon {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
}

</style>
