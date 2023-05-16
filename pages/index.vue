<template>
    <div>
      <NuxtLink v-slot="{ navigate }" to="/todo" custom>
        <v-card @click="navigate" text="Todo" variant="outlined"></v-card>
    </NuxtLink>
      

    </div>
  </template>
  