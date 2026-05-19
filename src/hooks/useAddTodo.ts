import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { addTodo, fetchTodos } from "../services/todo/todoApi.ts";

export const useAddTodo = () => {
  const setTodos = useSetAtom(todosAtom);
  const controller = new AbortController();

  return async (title: string): Promise<void> => {
    await addTodo(title, controller.signal);
    const todos = await fetchTodos(controller.signal);
    setTodos(todos);
  };
};
