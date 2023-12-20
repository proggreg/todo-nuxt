<!-- eslint-disable vue/max-attributes-per-line -->
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
  store.setCurrentTodo(todo);
  dialog.value = true;
}

function formatDate(date: Date) {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleDateString("en-GB");
}

function deleteItem(todo: Todo) {
  if (todo._id) {
    store.deleteTodo(todo._id);
  }
}

function getStatusColor(todoStatus: string) {
  const status = statuses.filter((status) => status.name === todoStatus);
  if (status.length > 0) {
    return status[0].color;
  }
}

const expanded = computed(() => {
  // Get the grouped todos by status
  const groupedTodos = store.currentList.todos.reduce((result, todo) => {
    const status = todo.status;
    if (!result[status]) {
      result[status] = [];
    }
    result[status].push(todo);
    return result;
  }, {});

  // Get the name of the last todos in each group
  const lastTodoNames = Object.values(groupedTodos).map((todos: Todo[]) => {
    const lastTodo = todos[todos.length - 1];

    return lastTodo ? lastTodo._id : "";
  });

  return lastTodoNames;
});

const newTodoVariant = ref("text");
const openNewTodo = ref('');
const newTodoTitle = ref("");

const customSortBy = ref([])


function addSort(key: string) {
  const index = customSortBy.value.findIndex(item => item.key === key);
  if (index === -1) {
    customSortBy.value.push({ key, order: 'asc' });
  } else {
    const order = customSortBy.value[index].order;
    customSortBy.value[index].order = order === 'asc' ? 'desc' : 'asc';
  }

}

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
}

onUpdated(() => {
  console.log('update', newTodo.value, openNewTodo.value)
  if (openNewTodo.value) {
    newTodo.value.focus()
  }

})
</script>

<template>
  <v-data-table :expanded="expanded" :headers="headers" :items="store.currentList.todos" :group-by="group" multi-sort
    hover :sort-by="customSortBy" show-expand item-value="_id" items-per-page="-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title :text="store.currentList.name" />
        <v-spacer />
      </v-toolbar>
    </template>
    <!-- 
    <template #headers="{sortBy, columns}" >
      {{ columns }}
      {{ sortBy }}

      {{ customSortBy }}
      
      </template> -->
    <template #item.dueDate="{ item }">
      <td>
        {{ formatDate(item.dueDate) }}
      </td>
    </template>
    <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length" style="width: 0;">
          <VBtn size="small" variant="text" :icon="isGroupOpen(item) ? '$expand' : '$next'" @click="toggleGroup(item)" />
          <VBtn size="x-small" :color="getStatusColor(item.value)" variant="tonal" :text="item.value"
            @click="toggleGroup(item)" />
        </td>
      </tr>
      <tr v-if="isGroupOpen(item)">
        <template v-for="column in columns" :key="column.title">
          <th v-if="column.title === 'Group'" width="0px" style="display: none;">
            Status
          </th>
          <th v-else @click="addSort(column.key)">
            {{ column.title }}
          </th>
        </template>
      </tr>
    </template>

    <template #item="{ item, columns }">
      <tr @click="showModal(item)">
        <template v-for="col in columns" :key="col.key">
          <td v-if="col.key === 'dueDate'">
            {{ formatDate(item[col.key]) }}
          </td>
          <td v-else-if="col.key === 'actions'">
            <v-btn icon="mdi-delete" variant="text" rounded="lg" elevation="0" small @click.stop="deleteItem(item)" />
          </td>
          <td v-else-if="col.key !== 'data-table-group'">
            {{ item[col.key] }}
          </td>
        </template>
      </tr>

      <AppDialog :open="dialog" @close="dialog = false">
        <TodoDetail />
      </AppDialog>
    </template>
    <template #expanded-row="{ item }">
      <tr v-if="openNewTodo === '' || openNewTodo !== item.status">
        <td colspan="5">
          <v-btn :variant="newTodoVariant" size="x-small" elevation="0"
            @click="openNewTodo = item.status; console.log(item)" @mouseover="newTodoVariant = 'outlined'"
            @mouseleave="newTodoVariant = 'text'">
            Add Todo
          </v-btn>
        </td>
      </tr>
      <tr v-else-if="openNewTodo === item.status">
        <td>
          <v-text-field ref="newTodo" v-model="newTodoTitle" variant="plain" placeholder="new todo"
            @blur="createTodo(item['status'])" @keyup.enter="$event.target.blur()" />
        </td>
      </tr>
    </template>

    <!-- <template #data-table-group="{props, count, item}">
      {{props, count, item}}
    </template> -->

    <template #colgroup="{ }">
      col group
    </template>

    <template #body.append>
      here
    </template>
    <template #bottom />
  </v-data-table>
</template>
