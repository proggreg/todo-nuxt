<script setup>
import { ref } from 'vue'

const { width } = useWindowSize()

const dialog = ref(false)

function openMobileNav () {
  drawer.value = !drawer.value
}

function todoSelected () {
  if (width.value < 600) {
    dialog.value = true
  }
}

</script>
<template>
  <client-only>
    <v-row>
      <v-col class="rounded-lg d-lg-none" cols="12" md="1">
        <v-btn class="" no-gutters @click="openMobileNav">
          Lists
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <app-list @todoSelected="todoSelected" />
      </v-col>
      <v-col class="fill-height d-none d-sm-block " cols="12" sm="5">
        <v-dialog>
          <v-sheet class="fill-height rounded-lg">
            <app-list-item />
          </v-sheet>
        </v-dialog>
        <v-sheet class="fill-height  rounded-lg">
          <app-list-item />
        </v-sheet>
      </v-col>
    </v-row>
  </client-only>
</template>
