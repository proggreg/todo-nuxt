import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],
    currentList: null,
    currentTask: null
  }),
  actions: {
    addList () {
      if (!this.lists.length || this.lists[this.lists.length - 1].name) {
        this.lists.push({
          name: '',
          tasks: []
        })
        this.currentList = this.lists[this.lists.length - 1]
      }

      this.currentList = this.lists[this.lists.length - 1]
    },
    setCurrentList (currentList) {
      this.currentList = currentList
    },
    addTask (taskName) {
      this.currentList.tasks.push({
        name: taskName.value
      })
    },
    setCurrentTask (currentTask) {
      this.currentTask = currentTask
    },
    setTaskName (name) {
      this.currentList.tasks[currentTask].name = name
    }
  },
  getters: {
    getLists: state => state.lists
    // getListsTasks: (state) => { },
    // getTask: (state) => {
    //   return state.currentList.tasks.length > 0 ? state.currentList.tasks[state.currentList.tasks.length - 1]
    // }
  }

})
