export {Todo, Status, List}
declare global {
  interface Todo {
    name: string;
    _id?: string;
    dueDate?: Date,
    list_id?: string;
    status: Status;
    desc?: string;
  }

  type Status = 'Open' | 'Done';

  interface List {
    name: string;
    todos: Todo[];
    _id?: string;
  }
}
