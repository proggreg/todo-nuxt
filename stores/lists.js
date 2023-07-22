import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],
    currentList: null,
    currentTask: null
  }),
  actions: {
    addList () {
      this.lists.push({
        name: '',
        tasks: []
      })
    },
    setCurrentList (currentList) {
      this.currentList = currentList
    },
    setCurrentTask (currentTask) {
      this.currentTask = currentTask
    },
    setTaskName (name) {
      this.currentList.tasks[currentTask].name = name
    }
  },
  getters: {
    // getListsTasks: (state) => { },
    // getTask: (state) => {
    //   return state.currentList.tasks.length > 0 ? state.currentList.tasks[state.currentList.tasks.length - 1]
    // }
  }
})
