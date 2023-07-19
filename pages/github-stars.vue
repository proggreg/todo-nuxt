<script setup>
let url = 'https://api.github.com/search/repositories'
let pageNumber = ref(1)
let perPage = ref('12')
let repos = reactive([])
let language = ref('')
const programmingLanguages = ref([
    "Python",
    "JavaScript",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "Swift",
    "Go",
    "PHP",
    "TypeScript",
    "R",
    "Kotlin",
    "Scala",
    "Rust",
    "Perl",
    "Objective-C",
    "Lua",
    "Haskell",
    "MATLAB",
    "Shell"
]);
let query = 'stars';
let {data, refresh} = await useFetch(url, {
  transform: (data) => data.items,
  query: { 
    page: pageNumber,
    per_page: perPage,
    sort: 'stars',
    order: 'desc',
    q: query, 
    }
})

if (process.client) {
  console.log(JSON.stringify(data.value))
  window.repos = data.value
}

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
  <v-col v-for="repo in data" cols="12" xs="6" sm="6" md="4" >
    <v-card :title="repo.name" >
      <v-card-text class="line-clamp">         
          {{ repo.description }}
      </v-card-text>
      <v-card-actions>
        <a :href="repo.html_url" target="_blank">
        <v-btn>Open</v-btn>
            </a>
            <a :href="repo.stargazers_url">
              {{ repo.stargazers_count }} <v-icon icon="mdi-star" color="yellow"/>
            </a>
          </v-card-actions>
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

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          {{ language }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in programmingLanguages"
          :key="index"
          :value="option"
          @click="query = 'stars&language='+ option;console.log(query); refresh()"
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
<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>