<script setup>
import { reactive } from "vue";
const variant = "tonal";
let listsArr = [];
function cacheLists() {
  console.log("cacheLists");
  localStorage.setItem("lists", JSON.stringify(lists));
}
if (process.client) {
  listsArr = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : [];
}

const lists = reactive(listsArr);
function newList() {
  console.log("new list");
  lists.push({
    tasks: []
  });
  cacheLists();
}
function deleteList(index) {
  console.log("delete list ", index);
  lists.splice(index, 1);
  cacheLists();
}

function addTask(list) {
  if (!list.tasks) {
    list.tasks = reactive([]);
  }
  list.tasks.push({});
  cacheLists();
}

function deleteTask(list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1);
  }
  cacheLists();
}

function showDesc(task) {
  if (!task.showDescription) {
    task.showDescription = true;
  } else {
    task.showDescription = false;
  }
}
</script>

<template>
    <v-row dense>
      <v-col col="12">
  <v-card :variant="variant">
    <v-card-title>Todo List</v-card-title>
    <v-card-actions>
      <v-btn variant="outlined" @click="newList">New List</v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
  <v-row v-for="(list, index) in lists" :key="index">
    <v-col>
      <v-card>
      <v-list 
        :items="list.tasks"
        :key="index"
        :variant="variant"
        rounded
        :opened="list.opened"
      >
    <v-cart-title>
      <v-text-field v-model="list.name" placeholder="My List" @input="cacheLists()"></v-text-field>
    </v-cart-title>
  <v-list-group value="list.tasks" fluid>
    <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-checkbox-multiple-marked-outline"
          >
          Tasks {{list.tasks.length }}
        </v-list-item>
        </template>
        <v-list-item v-for="(task, index) in list.tasks" :key="index" density="compact">
          <v-list-item-title>
            <v-text-field
            v-model="task.name"
            placeholder="My Task"
            variant="underlined"
            @input="cacheLists"
          >        
          
          </v-text-field>
        </v-list-item-title>
        <template v-slot:append>
            <v-checkbox density="compact" v-model="task.done" @change="cacheLists()"></v-checkbox>
          </template>
      </v-list-item>
      <v-list-item>
        <v-btn color="primary" @click="addTask(list)">New Task</v-btn>
      </v-list-item>
    </v-list-group>
    
    <v-card-actions>
      <v-btn color="secondary" @click="deleteList(index)">Delete</v-btn>
    </v-card-actions>
    
  </v-list>
</v-card>
</v-col>
</v-row>

</template>
