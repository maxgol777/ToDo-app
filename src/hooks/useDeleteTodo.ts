import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { deleteTodo, fetchTodos } from "../services/todo/todoApi.ts";

export const useDeleteTodo = () => {
  const setTodos = useSetAtom(todosAtom);
  const controller = new AbortController();

  return async (id: number) => {
    await deleteTodo(id, controller.signal);
    const todos = await fetchTodos(controller.signal);
    setTodos(todos);
  };
};
