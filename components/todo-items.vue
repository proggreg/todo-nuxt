<script setup>
import { reactive, ref } from "vue";
import { useListsStore } from "~/stores/lists";
const listsStore = useListsStore();
const props = defineProps({
  list: {
    type: Object,
    default() {
      return {};
    },
  },
});

const showTodo = ref(false);

function addTask(list) {
  if (!list.tasks) {
    list.tasks = reactive([]);
  }
  list.tasks.push({
    name: "",
  });
  listsStore.setCurrentTask(list.tasks[list.tasks.length - 1]);
  showTodo.value = true;
}

function deleteTask(list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1);
  }
}

function editTask(todo) {
  listsStore.setCurrentTask(todo);
  showTodo.value = true;
}
</script>

<template>
  <todo-item v-if="showTodo" @close="showTodo = false"></todo-item>
  <v-list v-else :key="index" :items="props.list.tasks" elevation="0" rounded>
    <v-list-subheader>Tasks</v-list-subheader>
    <v-list-item
      v-for="(task, index) in list.tasks"
      :key="index"
      density="compact"
      variant="tonal"
      width="100%"
    >
      <v-list-item-title>
        <v-text-field
          v-model="task.name"
          :class="task.done ? 'text-decoration-line-through' : ''"
          :disabled="task.done"
        ></v-text-field>
      </v-list-item-title>
      <template #prepend="{}">
        <v-list-item-action start>
          <v-checkbox-btn v-model="task.done"></v-checkbox-btn>
        </v-list-item-action>
      </template>
      <template #append="{}">
        <v-list-item-action end>
          <v-btn
            variant="tonal"
            size="x-small"
            color="yellow"
            @click="editTask(task)"
            >edit</v-btn
          >
          <v-btn
            variant="tonal"
            size="x-small"
            color="red"
            @click="deleteTask(list, task)"
            >Delete</v-btn
          >
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-list-item>
      <v-spacer></v-spacer>
      <template #append>
        <v-btn
          :disabled="!listsStore.currentList.name ? true : false"
          color="success"
          size="x-small"
          @click="addTask(list)"
        >
          New Task
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>
