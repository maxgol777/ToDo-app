import { useAtomValue, useSetAtom } from "jotai";
import { addTodoAtom, editTodoAtom, removeTodoAtom, toggleTodoAtom } from "./actions";
import { todosAtom } from "./atoms";
import type { TodoStateValue } from "./types";

export const useTodoStateHandler = (): TodoStateValue => {
  const todos = useAtomValue(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);
  const editTodo = useSetAtom(editTodoAtom);

  return { todos, addTodo, toggleTodo, removeTodo, editTodo };
};
