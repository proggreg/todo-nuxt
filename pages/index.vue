<template>
  <div>
    <NuxtLink v-slot="{ navigate }" to="/lists-dashboard" custom>
      <v-card text="Todo list" variant="outlined" @click="navigate"></v-card>
    </NuxtLink>
  </div>
</template>
