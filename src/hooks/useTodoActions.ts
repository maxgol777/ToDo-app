import { useSetAtom } from "jotai";
import { toggleTodoAtom, editTodoAtom } from "../state/todo/actions";
import type { TodoActions } from "../state/todo/types";

export const useTodoActions = (): TodoActions => {
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const editTodo = useSetAtom(editTodoAtom);
  return { toggleTodo, editTodo };
};
