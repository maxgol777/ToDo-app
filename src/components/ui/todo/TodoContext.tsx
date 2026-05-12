import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Todo } from "./types";

export type TodoContextValue = {
  items: Todo[];
  setItems: Dispatch<SetStateAction<Todo[]>>;
};

export const TodoContext = createContext<TodoContextValue>({
  items: [],
  setItems: () => {},
});
