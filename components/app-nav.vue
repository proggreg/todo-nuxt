<script setup lang="ts">
const open = useNav()
const dialog = ref(false)
const listsStore = useListsStore()
const { width } = useWindowSize()
const desktop = computed(() => width.value > 800)

listsStore.getLists()

function closeDrawer () {
  if (width < 800) {
    open.value = false
  }
}

</script>

<template>
  <v-app-bar
    density="comfortable"
    height="100"
    elevation="0"
    align-center
    class="d-flex justify-space-between"
    style="justify-content: space-between;"
  >
    <template #prepend>
      <v-btn v-if="width < 800" size="small" style="padding: 0;" elevation="0" @click="open = !open">
        <v-icon class="text-h4" size="x-large">
          mdi-format-list-bulleted
        </v-icon>
      </v-btn>

      <app-profile />
    </template>

    <app-search />
    <!-- <v-spacer /> -->
    <template #append>
      <darkmode-switch />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="open"
    class="pa-2 fill-height"
    :permanent="desktop"
  >
    <v-list>
      <v-spacer />
      <v-btn
        elevation="0"
        rounded="lg"
        append-icon="mdi-home"
        width="100%"
        to="/"
        @click="closeDrawer"
      >
        Today
      </v-btn>

      <v-list-item>
        <template #append>
          <v-btn elevation="0" rounded="lg" icon="mdi-plus" @click="dialog = true" />
        </template>
        <template #prepend>
          <dialog-list-new
            :open="dialog"
            @close="(val) => {

              dialog = false;

            }"
          />
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <app-lists />
  </v-navigation-drawer>
</template>
