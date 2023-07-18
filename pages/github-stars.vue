<script setup>
let url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc'
let pageNumber = ref(1)
let perPage = ref('12')
let repos = reactive([])
let {data, refresh} = await useFetch(url, {
  transform: (data) => data.items,
  query: { page: pageNumber, per_page: perPage}
})

const pageOptions = ['12', '24', '48']
function backPage() {
  if (pageNumber.value > 1) {
    pageNumber.value--
    refresh()   
  }
}

function nextPage() {
  pageNumber.value++
  refresh() 
}


</script>
<template>
<v-row>
  <v-col v-for="repo in data" cols="4" >
    <v-card :title="repo.name" >
            <v-card-text >
              {{ repo.stargazers_count }}
  
        <v-icon icon="mdi-star" color="yellow"/>
      </v-card-text>
      <v-card-action>
        <a :href="repo.html_url" target="_blank">
        <v-btn>Open</v-btn>
            </a>
      </v-card-action>
    </v-card>
  </v-col>
</v-row>
<v-row>
  <v-col>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          {{ perPage }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in pageOptions"
          :key="index"
          :value="option"
          @click="perPage = option; refresh()"
        >
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-col>
  <v-col>
    {{ pageNumber }}
    <v-btn @click="backPage()">
      Back Page
    </v-btn>
    <v-btn @click="nextPage()">
      Next Page
    </v-btn>
  </v-col>
</v-row>

</template>
