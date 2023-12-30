<script setup lang="ts">
const store = useListsStore()
const { statuses } = useSettingsStore()

const headers = [
  { title: 'Title', key: 'name', maxWidth: '10px' },
  { title: 'Description', key: 'desc' },
  { title: 'Date', key: 'dueDate', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
]

const group = ref([{
  key: 'status',
  order: true,
  title: 'Status'
}])

function formatDate (date:Date) {
  if (!date) { return '' }
  return new Date(date).toLocaleDateString('en-GB')
}

function editItem (item) {
  // TODO: Implement edit functionality
}

function deleteItem (item) {
  // TODO: Implement delete functionality
}

function getStatusColor (todoStatus: string) {
  const status = statuses.filter(status => status.name === todoStatus)
  if (status.length > 0) {
    return status[0].color
  }
}

const expanded = ref(['root_status_Open'])
</script>

<template>
  <v-data-table
    :expanded="expanded"
    :headers="headers"
    :items="store.currentList.todos"
    :group-by="group"
    :sort-by="[{ key: 'status'}]"
    must-sort
    hover
  >
    <template #headers="{columns}">
      <!-- <tr>
        <template v-for="column in columns" :key="column.title">
          <th v-if="column.title === 'Group'" width="180px">
            Status
          </th>
          <th v-else>
            {{ column.title }}
          </th>
        </template>
      </tr> -->
    </template>
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title :text="store.currentList.name" />
        <v-spacer />
      </v-toolbar>
    </template>
    <!-- <template #item.dueDate="{ item }">
      <td>
        {{ formatDate(item.dueDate) }}
      </td>
    </template> -->
    <template #group-header="{ item, columns, toggleGroup, isGroupOpen, isExpanded }">
      <tr>
        <td :colspan="columns.length">
          <VBtn
            size="small"
            variant="text"
            :icon="isGroupOpen(item) ? '$expand' : '$next'"
            @click="toggleGroup(item)"
          />
          <VBtn
            size="x-small"
            :color="getStatusColor(item.value)"
            variant="tonal"
            :text="item.value"
            @click="toggleGroup(item)"
          />
        </td>
      </tr>
      <tr>
        <template v-for="column in columns" :key="column.title">
          <th v-if="column.title === 'Group'" width="180px">
            Status
          </th>
          <th v-else>
            {{ column.title }}
          </th>
        </template>
      </tr>
    </template>

    <template #item="{item}">
      <tr>
        <td><ListStatus :todo="item" /></td>
        <td>{{ item.name }}</td>
        <td>{{ item.desc }}</td>
        <td>
          {{ formatDate(item.dueDate) }}
        </td>
        <td />
      </tr>
    </template>

    <template #bottom />

    <template #no-data />
  </v-data-table>
</template>
