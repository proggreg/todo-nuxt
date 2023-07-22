<template>
  <div>
    <NuxtLink v-slot="{ navigate }" to="/lists-dashboard" custom>
      <v-card text="Todo list" variant="outlined" @click="navigate" />
    </NuxtLink>
    <NuxtLink v-slot="{ navigate }" to="/github-stars" custom>
      <v-card text="Github Stars" variant="outlined" @click="navigate" />
    </NuxtLink>
  </div>
</template>
