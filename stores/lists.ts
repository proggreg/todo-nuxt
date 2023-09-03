import { defineStore } from 'pinia'

interface task {
  name: string;
  done: boolean;
}

interface list {
  name: string;
  tasks: task[]
}

interface listsState {
  lists: list[],
  currentList?: list,
  currentTask?: task
}

export const useListsStore = defineStore('lists', {
  state: () : listsState => ({
    lists: [],
    currentList: {
      name: '',
      tasks: []
    },
    currentTask: {
      name: '',
      done: false
    }
  }),
  actions: {
    addList () {
      // if (!this.lists.length || this.lists[this.lists.length - 1].name) {
      const newList = {
        name: '',
        tasks: []
      }
      this.lists.push(newList)
      console.log('add list ', this.lists.length)
      this.currentList = this.lists[this.lists.length - 1]
      // }

      this.currentList = this.lists[this.lists.length - 1]
    },
    setLists (lists: Array<list>) {
      this.lists = lists
    },
    setCurrentList (currentList: list) {
      this.currentList = currentList
    },
    setCurrentListTasks (tasks: list['tasks']) {
      if (!this.currentList) { return }
      if (tasks) {
        this.currentList.tasks = tasks
      }
    },
    addTask (taskName: string) {
      if (!this.currentList) { return }
      this.currentList.tasks.push({
        name: taskName,
        done: false
      })
    },
    setCurrentTask (currentTask: task) {
      this.currentTask = currentTask
    },
    setTaskName (name :string, index: number) {
      if (!this.currentTask || !this.currentList) { return }
      this.currentList.tasks[index].name = name
    }
  },
  getters: { // TODO uncomment and complete
    getLists: state => state.lists
    // getListsTasks: (state) => { },
    // getTask: (state) => {
    //   return state.currentList.tasks.length > 0 ? state.currentList.tasks[state.currentList.tasks.length - 1]
    // }
  }
})
