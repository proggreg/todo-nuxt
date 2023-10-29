import { defineStore } from 'pinia'
import { Todo, List } from '~/types/globals'

interface listsState {
  lists: List[],
  currentList?: List,
  currentTask?: Todo,
  todaysTodos?: Todo[]
}

export const useListsStore = defineStore('lists', {
  state: () : listsState => ({
    lists: [],
    currentList: undefined,
    currentTask: undefined,
    todaysTodos: []
  }),
  actions: {
    async addList (listName: string) {
      if (listName) {
        const newListData = { name: listName, todos: [] }

        this.lists.push(newListData)
        this.currentList = newListData
        const newList = await $fetch<List>('/api/list/create', {
          method: 'POST',
          body: newListData
        })

        this.lists[this.lists.length - 1]._id = newList._id
      }
    },
    setLists (lists: Array<List>) {
      this.lists = lists
    },
    async deleteList (listId: string) {
      if (listId) {
        const data = await $fetch<List>(`/api/list/${listId}`, {
          method: 'DELETE'
        })

        this.lists = this.lists.filter(list => list._id !== data._id)
      }
    },
    async deleteTodo (todoId : string) {
      await $fetch(`/api/list/todo/${todoId}`, {
        method: 'DELETE'
      })
      if (!this.currentList) { return }
      this.currentList.todos = this.currentList.todos.filter(todo => todo._id !== todoId)
    },
    setCurrentList (currentList: List) {
      this.currentList = currentList
    },
    setCurrentListTasks (todos: List['todos']) {
      if (!this.currentList) { return }
      if (todos) {
        this.currentList.todos = todos
      }
    },
    async addTodo (newTodo: Todo) {
      if (!this.currentList) { return }
      const todo = await $fetch<Todo>(`/api/list/todo/${this.currentList._id}`, {
        method: 'POST',
        body: newTodo
      })
      this.currentList.todos.push(todo)
    },
    async getTodos (listId: string) {
      const { data: todos } = await useFetch<Todo[]>(`/api/list/todo/${listId}`)
      if (!this.currentList || !todos) { return }
      this.setCurrentListTasks(todos)
    },
    setCurrentTask (currentTask: Todo) {
      this.currentTask = currentTask
    },
    setDueDate (date: Date) {
      if (this.currentTask) {
        this.currentTask.dueDate = date
      }
    },
    setTaskName (name :string, index: number) {
      if (!this.currentTask || !this.currentList) { return }
      this.currentList.todos[index].name = name
    },
    async getLists () {
      const { data } = await useFetch<List[]>('/api/lists')

      this.setLists(data.value)
    },
    async getTodaysTodos () {
      const { data } = await useFetch<Todo[]>('/api/today')

      this.setCurrentList({
        name: 'Today',
        todos: data
      })

      this.todaysTodos = data
    },
    async updateTodo (todo: Todo) {
      const updatedTodo = await $fetch<Todo>(`/api/list/todo/${todo._id}`, {
        method: 'PUT',
        body: todo
      })
      this.setCurrentTask(updatedTodo)
    }
  }
})
