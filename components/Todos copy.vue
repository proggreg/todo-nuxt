<script setup>
import { reactive, ref} from "vue";
let open = ref([]);
const props = defineProps({
    list: Object
  })

let textFieldVariant = ref('solo')

var dialog = ref(false);
let newListName = ref('');
function cacheLists() {
  localStorage.setItem("lists", JSON.stringify(lists));
}
if (process.client) {
  listsArr = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : listsArr;

    if (!Array.isArray(listsArr)) {
      throw new Error('listsArr must be an array')
    }
}

let lists = reactive(listsArr);

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
  cacheLists();
}

function deleteTask(list, index) {
  if (list.tasks) {
    list.tasks.splice(index, 1);
  }
  cacheLists();
}

// function showDesc(task) {
//   if (!task.showDescription) {
//     task.showDescription = true;
//   } else {
//     task.showDescription = false;
//   }
// }
</script>

<template>
    <v-row dense>
      <v-col col="12">
  <v-toolbar>
    <v-toolbar-title>Todo Lists</v-toolbar-title>
    <v-btn @click="showLists">Lists</v-btn>
      <v-dialog
      v-model="dialog"
      persistent
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          >
          New list
        </v-btn>
      </template>
      <v-container>
      <v-card rounded>
        <v-card-text>
          <v-text-field placeholder="My list" 
                        v-model="newListName" 
                        @keyup.enter="newList"
                        :variant="textFieldVariant"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="newList" >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
      </v-dialog>
      
  </v-toolbar>
</v-col>
</v-row>
<v-list open-strategy="single">
<v-row v-for="(list, index) in lists" :key="index" :id="'list-' + index">
  <v-col>
    <v-list 
      :items="list.tasks"
      :key="index"
      elevation="10"
      density="comfortable"
      :opened="open"
      rounded
    >
  <v-list-item rounded>
    <v-text-field 
    v-model="list.name" 
    placeholder="My List" 
    @input="cacheLists()"
    clearable
    density="compact"
    type="title"
    hide-details
    :variant="textFieldVariant"
    ></v-text-field>
  </v-list-item>
<v-list-group :value="list.name" fluid>
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
          :variant="textFieldVariant"
          density="compact"
          @input="cacheLists"
          @keyup.enter="addTask(list)"
          clearable
          :class="task.done ? 'text-decoration-line-through' : ''"
          :disabled="task.done"
          hide-details
        >        
        
        </v-text-field>
      </v-list-item-title>
      <template v-slot:prepend="{ isActive }">
        <v-list-item-action start>
          <v-checkbox-btn  v-model="task.done" @change="cacheLists()"></v-checkbox-btn>
        </v-list-item-action>
      </template>
      <template v-slot:append="{ isActive }">
        <v-list-item-action end>
          <v-btn variant="tonal" size="x-small" color="red"  @click="deleteTask(list, task)">Delete</v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-list-item>
      <v-btn color="primary" size="x-small" @click="addTask(list)">New Task</v-btn>
    </v-list-item>
  </v-list-group>
  
  <v-card-actions>
    <v-btn color="secondary" size="x-small" @click="deleteList(index)">Delete</v-btn>
    <v-btn v-if="dialog" color="primary" @click="dialog = false">Close</v-btn>
  </v-card-actions>
  </v-list>
</v-col>
</v-row>
</v-list>

</template>
