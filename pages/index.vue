<template>
  <div>
    <NuxtLink v-slot="{ navigate }" to="/listdashboard" custom>
      <v-card text="Todo list" variant="outlined" @click="navigate"></v-card>
    </NuxtLink>
  </div>
</template>
