import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../../services/todo/todoApi.ts";
import { todoQueryKeys } from "../../services/todo/queryKeys.ts";
import type { Todo } from "../../state/todo/types.ts";
import type { BaseFetchResult } from "./types.ts";

type UseFetchTodosResult = BaseFetchResult & {
  todos: Todo[];
};

export const useFetchTodos = (): UseFetchTodosResult => {
  const { data, isPending, error } = useQuery({
    queryKey: todoQueryKeys.todos,
    queryFn: ({ signal }) => fetchTodos(signal),
  });

  return {
    todos: data ?? [],
    isLoading: isPending,
    error: error ? (error.message ?? "Unexpected error while loading todos") : null,
  };
};
