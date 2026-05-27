import { useQuery } from "@tanstack/react-query";
import { fetchSingleTodo } from "../../services/todo/todoApi.ts";
import { todoQueryKeys } from "../../services/todo/queryKeys.ts";
import type { Todo } from "../../state/todo/types.ts";
import type { BaseFetchResult } from "./types.ts";

type UseFetchTodoResult = BaseFetchResult & {
  todo: Todo | undefined;
};

export const useFetchTodo = (id: number | undefined): UseFetchTodoResult => {
  const hasValidId = typeof id === "number" && Number.isFinite(id);

  const { data, isPending, error, fetchStatus } = useQuery({
    queryKey: hasValidId ? todoQueryKeys.detail(id) : ["todo", "disabled"],
    queryFn: ({ signal }) => fetchSingleTodo(id as number, signal),
    enabled: hasValidId,
  });

  return {
    todo: data,
    isLoading: hasValidId && isPending && fetchStatus !== "idle",
    error: error ? (error.message ?? "Unexpected error while loading todo") : null,
  };
};
