export type TodoStatus = "Done" | "Pending";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
};

export type TodoActions = {
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  editTodo: (todo: Todo) => Promise<void>;
  toggleTodoStatus: (todo: Todo) => Promise<void>;
};
