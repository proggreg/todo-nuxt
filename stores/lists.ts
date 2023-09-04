import { defineStore } from 'pinia'

interface todo {
  name: string;
  done: boolean;
}
interface list {
  name: string;
  todos: todo[],
  _id?: string
}

interface listsState {
  lists: list[],
  currentList?: list,
  currentTask?: todo
}

export const useListsStore = defineStore('lists', {
  state: () : listsState => ({
    lists: [],
    currentList: undefined,
    currentTask: undefined
  }),
  actions: {
    async addList (listName: string) {
      if (listName) {
        const newListData = { name: listName, tasks: [] }

        const newList = await $fetch<list>('/api/list/create', {
          method: 'POST',
          body: newListData
        })
        this.lists.push(newList)
        this.currentList = newList
      }
    },
    setLists (lists: Array<list>) {
      this.lists = lists
    },
    async deleteList (listId: string) {
      if (listId) {
        const data = await $fetch<list>(`/api/list/${listId}`, {
          method: 'DELETE'
        })

        this.lists = this.lists.filter(list => list._id !== data._id)
      }
    },
    setCurrentList (currentList: list) {
      this.currentList = currentList
    },
    setCurrentListTasks (todos: list['todos']) {
      if (!this.currentList) { return }
      if (todos) {
        this.currentList.todos = todos
      }
    },
    async addTodo (name: string) {
      if (!this.currentList) { return }
      const todo = await $fetch<todo>(`/api/list/todo/${this.currentList._id}`, {
        method: 'POST',
        body: {
          name,
          done: false
        }
      })
      this.currentList.todos.push(todo)
    },
    async getTodos (listId: string) {
      console.log('get todos', listId)
      const todos = await $fetch<todo[]>(`/api/list/todo/${listId}`)
      if (!this.currentList || !todos) { return }
      this.setCurrentListTasks(todos)
    },
    setCurrentTask (currentTask: todo) {
      this.currentTask = currentTask
    },
    setTaskName (name :string, index: number) {
      if (!this.currentTask || !this.currentList) { return }
      this.currentList.todos[index].name = name
    },
    async getLists () {
      const data = await $fetch<list[]>('/api/lists')
      this.setLists(data)
    }
  }
})
