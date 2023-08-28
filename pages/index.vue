<template>
  <v-row>
    <v-col>
      <NuxtLink v-slot="{ navigate }" to="/lists" custom>
        <v-card text="Todo list" variant="outlined" @click="navigate" />
      </NuxtLink>
    </v-col>
    <v-col>
      <NuxtLink v-slot="{ navigate }" to="/github-stars" custom>
        <v-card text="Github Stars" variant="outlined" @click="navigate" />
      </NuxtLink>
    </v-col>
  </v-row>
</template>
