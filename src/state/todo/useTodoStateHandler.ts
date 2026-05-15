import { useAtomValue, useSetAtom } from "jotai";
import { addTodoAtom, editTodoAtom, removeTodoAtom, toggleTodoAtom } from "./actions";
import { todosAtom } from "./atoms";
import type { TodoContextValue } from "./types";

export const useTodoStateHandler = (): TodoContextValue => {
  const todos = useAtomValue(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);
  const editTodo = useSetAtom(editTodoAtom);

  return { todos, addTodo, toggleTodo, removeTodo, editTodo };
};
