import { defineStore } from "pinia"

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],
    currentList: null
  }),
  actions: {
    addList() {
      this.lists.push({
        name: '',
        tasks: []
      })
    },
    setCurrentList(currentList) {
      this.currentList = currentList
    }
  },
  getters: {
    getListsTasks() {

    }
  }
})