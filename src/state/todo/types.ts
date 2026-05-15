import type { Todo } from "../../components/ui/todo/types";

export type TodoContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (payload: { id: number; title: string }) => void;
};
