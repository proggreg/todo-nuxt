export interface Todo {
    name: string;
    done: boolean;
    _id?: string;
  }

  export interface List {
    name: string;
    todos: Todo[];
    _id?: string;
  }