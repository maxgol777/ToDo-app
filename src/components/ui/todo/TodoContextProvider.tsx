import { TodoContext } from "./TodoContext";
import { useState } from "react";
import type { ReactNode } from "react";
import type { Todo } from "./types";

const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "buy groceries", status: "Pending" },
  { id: 2, title: "go to the gym", status: "Pending" },
  { id: 3, title: "read a book", status: "Pending" },
  { id: 4, title: "watch a movie", status: "Pending" },
  { id: 5, title: "go for a walk", status: "Pending" },
];

type TodoContextProviderProps = {
  children: ReactNode;
};

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [items, setItems] = useState<Todo[]>(INITIAL_TODOS);

  return <TodoContext.Provider value={{ items, setItems }}>{children}</TodoContext.Provider>;
};
