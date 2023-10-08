<script setup>
const { width } = useWindowSize()
const dialog = ref(false)

function todoSelected () {
  if (width.value < 600) {
    dialog.value = true
  }
}

</script>
<template>
  <client-only>
    <v-row>
      <v-col cols="12" sm="6">
        <app-list @todoSelected="todoSelected" />
      </v-col>
      <v-col class="fill-height d-none d-sm-block " cols="12" sm="5">
        <v-sheet class="fill-height  rounded-lg">
          <app-item-detail />
        </v-sheet>
      </v-col>
    </v-row>
  </client-only>
</template>
