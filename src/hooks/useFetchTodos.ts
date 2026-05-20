import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { todosAtom } from "../state/todo/atoms";
import { fetchTodos } from "../services/todo/todoApi.ts";

type UseFetchTodosResult = {
  isLoading: boolean;
  error: string | null;
};

export const useFetchTodos = (): UseFetchTodosResult => {
  const setTodos = useSetAtom(todosAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const todos = await fetchTodos(controller.signal);
        if (!isActive) return;
        setTodos(todos);
      } catch (err) {
        if (controller.signal.aborted) return;
        if (!isActive) return;
        const message = err instanceof Error ? err.message : "Unexpected error while loading todos";
        setError(message);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadTodos();

    return () => {
      isActive = false;
      // on cleanup:
      controller.abort();
    };
  }, [setTodos]);

  return { isLoading, error };
};
