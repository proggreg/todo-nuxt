<script setup>
const cardData = ref([{
  title: 'Todo list',
  icon: 'mdi-checkbox-marked-outline',
  route: 'lists-dashboard',
  description: 'A simple Todo app to get tasks done.'
}, {
  title: 'Github Stars',
  icon: 'mdi-star',
  route: 'github-stars',
  description: 'Explore the most popular github repos.'
}
])

</script>

<template>
  <v-row justify="center">
    <AboutmeSection />
  </v-row>
  <v-row>
    <v-col v-for="data in cardData" :key="data.title">
      <NuxtLink v-slot="{ navigate }" :to="data.route" custom>
        <v-card
          :title="data.title"
          :text="data.description"
          variant="outlined"
          :prepend-icon="data.icon"
          width="400"
          @click="navigate"
        />
      </NuxtLink>
    </v-col>
  </v-row>
</template>
