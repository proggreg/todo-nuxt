<script setup>
import { reactive } from 'vue'
var variant = "tonal";
const lists = reactive([])
function newList() {
    console.log('new list')
    lists.push({
        name: 'my list'
    })
}
function deleteList(index) {
    console.log('delete list ', index)
    lists.splice(0, index)
}

function addTask(list) {
    if (!list.tasks) {
        list.tasks = reactive([])
    } else {
        list.tasks.push({
            name: 'task'
        })
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

    <v-card :variant="variant" v-for="(list, index) in lists">
        <v-text-field></v-text-field>
        <v-btn @click="addTask(list)">New Task</v-btn>
        <v-btn @click="deleteList(index)">Delete</v-btn>

        <v-card variant="outlined" v-for="(task, index) in list.tasks">
            <v-text-field></v-text-field>
            <v-checkbox></v-checkbox>
        </v-card>
    </v-card>
</template>