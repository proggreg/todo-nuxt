<script setup lang="ts">
interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_url: string;
  stargazers_count: number;
}
interface RepoData extends Array<Repo>{
  items: Array<Repo>
}

// https://docs.github.com/en/free-pro-team@latest/rest/search/search?apiVersion=2022-11-28#search-repositories
const url = 'https://api.github.com/search/repositories'
const pageNumber = ref(1)
const perPage = ref('12')
const currentLanguage = ref('')
const language = ref('')
const programmingLanguages = ref([
  'Vue',
  'Python',
  'JavaScript',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'Swift',
  'Go',
  'PHP',
  'TypeScript',
  'R',
  'Kotlin',
  'Scala',
  'Rust',
  'Perl',
  'Objective-C',
  'Lua',
  'Haskell',
  'MATLAB',
  'Shell'
])
const query = ref('stars:>1000 archived:false')
const { data, refresh } = await useFetch(url, {
  transform: (data: RepoData) => {
    return data.items
  },
  query: {
    page: pageNumber,
    per_page: perPage,
    sort: 'stars',
    order: 'desc',
    archived: false,
    q: query,
    language
  },
  onRequest ({ request, options }) {
    // eslint-disable-next-line no-console
    console.debug(request, options)
  }

})

const pageOptions = ['12', '24', '48']
function backPage () {
  if (pageNumber.value > 1) {
    pageNumber.value--
  }
}

function nextPage () {
  pageNumber.value++
}
function changeLanguage (option : string) {
  language.value = option
  query.value = query.value + ' language:' + option
  currentLanguage.value = option
  refresh()
}
function removeLanguage () {
  query.value = query.value.replace(' language:' + currentLanguage.value, '')
  currentLanguage.value = ''
  refresh()
}

</script>
<template>
  <v-row>
    <v-col>
      <v-menu>
        <template #activator="{ props }">
          <v-btn color="primary" v-bind="props">
            language
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(option, index) in programmingLanguages"
            :key="index"
            :value="option"
            @click="changeLanguage(option)"
          >
            <v-list-item-title>{{ option }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-chip
        v-if="currentLanguage"
        @click="removeLanguage"
      >
        {{ currentLanguage }}
      </v-chip>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      v-for="(repo, index) in data"
      :key="index"
      cols="12"
      xs="6"
      sm="6"
      md="4"
    >
      <v-card :title="repo.name">
        <v-card-text class="line-clamp">
          {{ repo.description }}
        </v-card-text>
        <v-card-actions>
          <a :href="repo.html_url" target="_blank">
            <v-btn>Open</v-btn>
          </a>
          <a :href="repo.stargazers_url">
            {{ repo.stargazers_count }}
            <v-icon icon="mdi-star" color="yellow" />
          </a>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-bottom-navigation position="absolute" style="position: fixed">
    <v-menu>
      <template #activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ perPage }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(option, index) in pageOptions"
          :key="index"
          :value="option"
          @click="
            perPage = option;
            refresh();
          "
        >
          <v-list-item-title>{{ option }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn @click="backPage">
      Back Page
    </v-btn>
    <v-btn @click="nextPage">
      Next Page
    </v-btn>
  </v-bottom-navigation>
</template>
<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
