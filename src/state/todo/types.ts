export type TodoStatus = "Done" | "Pending";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
};

export type TodoActions = {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (payload: { id: number; title: string }) => void;
};
