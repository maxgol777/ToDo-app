import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";
import type { Todo } from "../state/todo/types";

type UseFetchTodosResult = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
};

export const useFetchTodos = (): UseFetchTodosResult => {
  const controller = new AbortController();
  const { data, isPending, error } = useQuery({
    queryKey: todoQueryKeys,
    queryFn: () => fetchTodos(controller.signal),
  });

  return {
    todos: data ?? [],
    isLoading: isPending,
    error: error ? (error.message ?? "Unexpected error while loading todos") : null,
  };
};
