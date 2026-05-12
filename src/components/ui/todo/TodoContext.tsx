import { createContext } from "react";
import type { Todo } from "./types";

export type TodoContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextValue | null>(null);
