import { defineStore } from 'pinia'

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: [],
    currentList: null,
    currentListId: null,
    currentTask: null
  }),
  actions: {
    addList () {
      if (!this.lists.length || this.lists[this.lists.length - 1].name) {
        this.lists.push({
          name: '',
          todos: []
        })
        this.currentList = this.lists[this.lists.length - 1]
      }

      this.currentList = this.lists[this.lists.length - 1]
    },
    setCurrentList (currentList) {
      this.currentList = currentList
    },
    setCurrentListTasks (todos) {
      this.currentList.todos = todos
    },
    setCurrentTask (currentTask) {
      this.currentTask = currentTask
    },
    setTaskName (name) {
      this.currentList.tasks[currentTask].name = name
    },
    setListId (listId) {
      this.listId = listId
    },
    addTask (taskName) {
      if (!this.currentList.todos) {
        this.currentList.todos = []
      }
      this.currentList.todos.push({
        name: taskName.value
      })
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
