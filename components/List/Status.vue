<script setup lang="ts">
const { statuses } = useSettingsStore()
const statusProps = defineProps<{todo: Todo}>()
function getStatusColor (todoStatus: string) {
  return statuses.filter(status => status.name === todoStatus)[0].color
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
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

</style>
