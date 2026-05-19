import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { createTodo, fetchTodos } from "../services/todo/todoApi.ts";

export const useAddTodo = () => {
  const setTodos = useSetAtom(todosAtom);

  return async (title: string): Promise<void> => {
    await createTodo(title);
    const todos = await fetchTodos();
    setTodos(todos);
  };
};
