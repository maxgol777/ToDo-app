import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { deleteTodo } from "../services/todo/todoApi.ts";
import { fetchTodos } from "../services/todo/todoApi.ts";

export const useDeleteTodo = () => {
  const setTodos = useSetAtom(todosAtom);

  return async (id: number): Promise<void> => {
    await deleteTodo(id);
    const todos = await fetchTodos();
    setTodos(todos);
  };
};
