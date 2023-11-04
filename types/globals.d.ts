export interface Todo {
    name: string;
    _id?: string;
    dueDate?: Date,
    list_id?: string;
    status: Status;
    desc?: string;
  }

  export type Status = 'Open' | 'Done';

  export interface List {
    name: string;
    todos: Todo[];
    _id?: string;
  }