import { useQuery } from "@tanstack/react-query";
import { fetchSingleTodo } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";
import type { Todo } from "../state/todo/types";

type UseFetchTodoResult = {
  todo: Todo | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useFetchTodo = (id: number | undefined): UseFetchTodoResult => {
  const enabled = typeof id === "number" && Number.isFinite(id);

  const { data, isPending, error, fetchStatus } = useQuery({
    queryKey: enabled ? todoQueryKeys.detail(id) : ["todo", "disabled"],
    queryFn: ({ signal }) => fetchSingleTodo(id as number, signal),
    enabled,
  });

  return {
    todo: data,
    isLoading: enabled && isPending && fetchStatus !== "idle",
    error: error ? (error.message ?? "Unexpected error while loading todo") : null,
  };
};
