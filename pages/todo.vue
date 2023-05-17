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
  lists.push({});
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
  list.tasks.push({
    name: "task",
  });
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
  <v-card :variant="variant">
    <v-card-title>Todo List</v-card-title>
    <v-card-actions>
      <v-btn variant="outlined" @click="newList">New List</v-btn>
    </v-card-actions>
  </v-card>

  <v-card
    v-for="(list, index) in lists"
    v-if="lists"
    :key="index"
    :variant="variant"
  >
    <v-cart-title>
      <v-text-field v-model="list.name" @input="cacheLists"></v-text-field>
    </v-cart-title>
    <v-card v-for="(task, index) in list.tasks" variant="outlined">
      <v-cart-title>
        <v-text-field
          v-model="task.name"
          placeholder="My Task"
          @input="cacheLists"
        ></v-text-field>
      </v-cart-title>

      <v-card-text>
        <!-- <v-icon @click="showDesc(task)">mdi-plus</v-icon> -->
        <!-- <v-textarea v-if="task.showDescription" clearable label="" variant="solo-inverted"></v-textarea> -->
      </v-card-text>
      <v-checkbox></v-checkbox>
      <v-card-actions>
        <v-btn color="secondary" @click="deleteTask(list, index)">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-card-actions>
      <v-btn color="primary" @click="addTask(list)">New Task</v-btn>
      <v-btn color="secondary" @click="deleteList(index)">Delete</v-btn>
    </v-card-actions>
    <v-col> </v-col>
  </v-card>
</template>
