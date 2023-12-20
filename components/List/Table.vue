<script setup lang="ts">
const store = useListsStore();
const { statuses } = useSettingsStore();
const props = defineProps<{ list_id: string }>();
const newTodo = ref(null)

const headers = [
  { title: "Title", key: "name", sortable: true },
  { title: "Description", key: "desc" },
  { title: "Date", key: "dueDate", sortable: true },
  { title: "Actions", key: "actions", sortable: false },
];

const group = ref([
  {
    key: "status",
    order: true,
    title: "Status",
  },
]);

const dialog = ref(false);

function showModal(todo: any) {
  store.setCurrentTodo(todo.raw);
  dialog.value = true;
}

function formatDate(date: Date) {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleDateString("en-GB");
}

function deleteItem(todo: Todo) {
  if (todo.value) {
    store.deleteTodo(todo.value);
  }
}

function getStatusColor(todoStatus: string) {
  const status = statuses.filter((status) => status.name === todoStatus);
  if (status.length > 0) {
    return status[0].color;
  }
}


const newTodoVariant = ref("text");
const openNewTodo = ref('');
const newTodoTitle = ref("");

const customSortBy = ref([])


// function addSort(key: string) {
//   const index = customSortBy.value.findIndex(item => item.key === key);
//   if (index === -1) {
//     customSortBy.value.push({ key, order: 'asc' });
//   } else {
//     const order = customSortBy.value[index].order;
//     customSortBy.value[index].order = order === 'asc' ? 'desc' : 'asc';
//   }

// }

async function createTodo(status: string) {

  if (newTodoTitle.value) {
    const newTodo: Todo = {
      name: newTodoTitle.value,
      status,
      desc: "",
      list_id: props.list_id,
    };
    await store.addTodo(newTodo);
    newTodoTitle.value = ''

  } else {
    openNewTodo.value = ''
  }
  if (newTodo.value) {
    newTodo.value[0].focus()
  }
}

</script>

<template>
  <v-data-table :headers="headers" :items="store.currentList.todos" :group-by="group" multi-sort hover
    :sort-by="customSortBy" show-expand item-value="_id" items-per-page="-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title :text="store.currentList.name" />
        <v-spacer />
      </v-toolbar>
    </template>

    <template #headers="{ sortBy, columns }" />

    <template #body="{ headers, columns, groupedItems, toggleGroup, isGroupOpen }">
      <template v-for="groupItem in groupedItems" :key="groupItem.key">
        <tr v-if="groupItem.key === 'status'">
          <th :colspan="columns.length">
            <v-btn size="x-small" :color="getStatusColor(groupItem.value)" variant="tonal" :text="groupItem.value"
              @click="toggleGroup(groupItem)" />
          </th>
        </tr>
        <template v-if="isGroupOpen(groupItem)">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <th v-if="column.key !== 'data-table-group'" colspan="1">
                {{ column.title }}
              </th>
            </template>
          </tr>
          <tr v-for="item in groupItem.items" :key="item.key" @click="showModal(item)">
            <template v-for="column in columns" :key="column.key">
              <template v-if="column.key !== 'data-table-group'">
                <td v-if="column.key === 'name' || column.key === 'desc'">
                  {{ item.columns[column.key] }}
                </td>
                <td v-else-if="column.key === 'dueDate'">
                  {{ formatDate(item.columns[column.key]) }}
                </td>
                <td v-else-if="column.key === 'actions'">
                  <v-btn icon="mdi-delete" variant="text" rounded="lg" elevation="0" small
                    @click.stop="deleteItem(item)" />
                </td>
              </template>
            </template>
          </tr>
          <AppDialog :open="dialog" @close="dialog = false">
            <TodoDetail />
          </AppDialog>

          <tr v-if="openNewTodo === '' || openNewTodo !== groupItem.value">
            <td colspan="5">
              <v-btn :variant="newTodoVariant" size="x-small" elevation="0" @click="openNewTodo = groupItem.value"
                @mouseover="newTodoVariant = 'outlined'" @mouseleave="newTodoVariant = 'text'">
                Add Todo
              </v-btn>
            </td>
          </tr>
          <tr v-else-if="groupItem.value === openNewTodo">
            <td colspan="5">
              <v-text-field ref="newTodo" v-model="newTodoTitle" variant="plain" placeholder="new todo"
                @blur="createTodo(groupItem.value)" @keyup.enter="$event.target.blur()" />
            </td>
          </tr>
        </template>
      </template>
    </template>
    <template #bottom />
  </v-data-table>
</template>
