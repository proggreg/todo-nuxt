export interface Todo {
    name: string;
    done: boolean;
    _id?: string;
    dueDate?: Date,
    list_id?: string;
    status: Status;
  }

  export type Status = 'Open' | 'Done';

  export interface List {
    name: string;
    todos: Todo[];
    _id?: string;
  }