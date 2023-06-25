<script setup>
import { reactive, ref} from "vue";
import { useListsStore } from '~/stores/lists';
const listsStore = useListsStore()
const props = defineProps({
    list: Object
  })

let textFieldVariant = ref('solo')
let showTodo = ref(false);


function addTask(list) {
  if (!list.tasks) {
    list.tasks = reactive([]);
  }
  list.tasks.push({
    name: ''
  });
  listsStore.setCurrentTask(list.tasks[list.tasks.length - 1])
  showTodo.value = true;
}

function deleteTask(list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1);
  }
}

function todoClick(todo) {
  listsStore.setCurrentTask(todo);
  showTodo.value = true;
}

</script>

<template>
  <Todo @close="showTodo = false" v-if="showTodo"></Todo>
  <v-list
      v-else
      :items="list.tasks"
      :key="index"
      elevation="0"
      rounded
    >
    <v-list-subheader>Tasks</v-list-subheader>
    <v-list-item v-for="(task, index) in list.tasks" 
      :key="index" density="compact" 
      variant="tonal" 
      width="100%"
      
      >
      <v-list-item-title @click="todoClick(task)">
        {{ task.name }}
      </v-list-item-title>
      <template v-slot:prepend="{ isActive }">
        <v-list-item-action start>
          <v-checkbox-btn  v-model="task.done"></v-checkbox-btn>
        </v-list-item-action>
      </template>
      <template v-slot:append="{ isActive }">
        <v-list-item-action end>
          <v-btn variant="tonal" size="x-small" color="red"  @click="deleteTask(list, task)">Delete</v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-list-item>
      <v-spacer></v-spacer>
      <template v-slot:append>
      <v-btn 
            :disabled="!listsStore.currentList.name ? true : false" 
            color="success" 
            size="x-small" 
            @click="addTask(list)">
            New Task
            </v-btn>
          </template>
    </v-list-item>
  </v-list>
</template>
