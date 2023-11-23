<script setup lang="ts">
const { statuses } = useSettingsStore()
const statusProps = defineProps<{todo: Todo}>()
function getStatusColor (todoStatus: string) {
  const status = statuses.filter(status => status.name === todoStatus)
  if (status.length > 0) {
    return status[0].color
  }
}
</script>
<template>
  <v-btn
    class=""
    size="x-small"
    rounded="xl"
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
