<script setup>
import { reactive, ref} from "vue";

const props = defineProps({
    list: Object
  })

let textFieldVariant = ref('solo')

function cacheLists() {
  // localStorage.setItem("lists", JSON.stringify(lists));
}


// function newList() {
 
//  dialog.value = false;
 
//  if (newListName.value) { 
//   lists.push({
//     name: newListName.value,
//     tasks: [{}]
//   });
//   open.value.push(lists[lists.length - 1].name)
//   newListName.value = ''
//   cacheLists();
//   } 
// }
// function deleteList(index) {
//   lists.splice(index, 1);
//   cacheLists();
// }

function addTask(list) {
  if (!list.tasks) {
    list.tasks = reactive([]);
  }
  list.tasks.push({});
}

function deleteTask(list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1);
  }
}

</script>

<template>
  <h2>Tasks</h2>
  <v-list
      :items="list.tasks"
      :key="index"
      elevation="0"
      density="comfortable"
      :opened="open"
      rounded
    >

    <v-list-item v-for="(task, index) in list.tasks" :key="index" density="compact" fluid>
      <v-list-item-title>
        <v-text-field
        v-model="task.name"
        placeholder="My Task"
        :variant="textFieldVariant"
        density="compact"
        @input="cacheLists"
        @keyup.enter="addTask(list)"
        clearable
        :class="task.done ? 'text-decoration-line-through' : ''"
        :disabled="task.done"
        hide-details
      ></v-text-field>
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
      <v-btn color="success" size="x-small" @click="addTask(list)">New Task</v-btn>
    </v-list-item>
  </v-list>
</template>
