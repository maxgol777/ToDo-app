import { useAtomValue, useSetAtom } from "jotai";
import { addTodoAtom, removeTodoAtom, toggleTodoAtom } from "./actions";
import { todosAtom } from "./atoms";
import type { TodoContextValue } from "./types";

export const useTodoStateHandler = (): TodoContextValue => {
  const todos = useAtomValue(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);

  return { todos, addTodo, toggleTodo, removeTodo };
};
