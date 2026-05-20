import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { fetchTodos, updateTodo } from "../services/todo/todoApi.ts";
import type { Todo } from "../state/todo/types";

export const useEditTodo = () => {
  const setTodos = useSetAtom(todosAtom);

  return async (todo: Todo) => {
    const controller = new AbortController();
    await updateTodo(todo, controller.signal);
    const todos = await fetchTodos(controller.signal);
    setTodos(todos);
  };
};
