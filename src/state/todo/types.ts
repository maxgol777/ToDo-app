export type TodoStatus = "Done" | "Pending";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
};

export type TodoActions = {
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (todo: Todo) => void;
  toggleTodoStatus: (todo: Todo) => void;
};
