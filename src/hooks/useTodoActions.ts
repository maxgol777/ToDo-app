import { useSetAtom } from "jotai";
import { removeTodoAtom, toggleTodoAtom, editTodoAtom } from "../state/todo/actions";
import type { TodoActions } from "../state/todo/types";

export const useTodoActions = (): TodoActions => {
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);
  const editTodo = useSetAtom(editTodoAtom);
  return { toggleTodo, removeTodo, editTodo };
};
