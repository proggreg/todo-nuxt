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
    lists.splice(index, 1)
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

function deleteTask(list, index) {
    if (list.tasks) {
        list.tasks.splice(index, 1)
    } 
}

function showDesc(task) {
    if (!task.showDescription) {
        task.showDescription = true;
    } else {
        task.showDescription = false
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
        <v-cart-title>
            <v-text-field placeholder="My List"></v-text-field>
        </v-cart-title>
        <v-card-actions>
            <v-btn color="primary" @click="addTask(list)">New Task</v-btn>
            <v-btn color="secondary" @click="deleteList(index)">Delete</v-btn>
        </v-card-actions>
        <v-col>
        <v-card variant="outlined" v-for="(task, index) in list.tasks">
            <v-cart-title>
            <v-text-field placeholder="My Task"></v-text-field>
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
    </v-col>
    </v-card>
</template>