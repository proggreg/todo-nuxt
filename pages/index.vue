<template>
  <div>
    <NuxtLink v-slot="{ navigate }" to="/listdashboard" custom>
      <v-card text="Todo list" variant="outlined" @click="navigate"></v-card>
    </NuxtLink>
    <NuxtLink v-slot="{ navigate }" to="/github-stars" custom>
      <v-card text="Github Stars" variant="outlined" @click="navigate"></v-card>
    </NuxtLink>
  </div>
</template>
