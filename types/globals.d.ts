export interface Todo {
    name: string;
    done: boolean;
    _id?: string;
    dueDate?: Date
  }

  export interface List {
    name: string;
    todos: Todo[];
    _id?: string;
  }