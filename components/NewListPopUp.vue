<script setup>
import { reactive, ref} from "vue";
let listsArr = [];
let open = ref([]);

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

function newList() {
 
 dialog.value = false;
 
 if (newListName.value) { 
  lists.push({
    name: newListName.value,
    tasks: [{}]
  });
  open.value.push(lists[lists.length - 1].name)
  newListName.value = ''
  cacheLists();
  } 
}

</script>
<template>
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
</template>