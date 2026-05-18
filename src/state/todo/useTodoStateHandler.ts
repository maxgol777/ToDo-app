import { useSetAtom } from "jotai";
import { addTodoAtom, editTodoAtom, removeTodoAtom, toggleTodoAtom } from "./actions";
import type { TodoActions } from "./types";

export const useTodoActions = (): TodoActions => {
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);
  const editTodo = useSetAtom(editTodoAtom);

  return { addTodo, toggleTodo, removeTodo, editTodo };
};
