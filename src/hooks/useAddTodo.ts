import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { addTodo, fetchTodos } from "../services/todo/todoApi.ts";

export const useAddTodo = () => {
  const setTodos = useSetAtom(todosAtom);

  return async (title: string): Promise<void> => {
    await addTodo(title);
    const todos = await fetchTodos();
    setTodos(todos);
  };
};
