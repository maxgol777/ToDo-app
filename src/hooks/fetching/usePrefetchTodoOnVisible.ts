import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchSingleTodo } from "../../services/todo/todoApi";
import { todoQueryKeys } from "../../services/todo/queryKeys";

const PREFETCH_DELAY_MS = 3000;

export const usePrefetchTodoOnVisible = (id: number) => {
  const queryClient = useQueryClient();
  const elementRef = useRef<HTMLDivElement | null>(null);

  // We only want to prefetch each id once per mount lifecycle.
  const hasPrefetchedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasPrefetchedRef.current) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const prefetch = () => {
      hasPrefetchedRef.current = true;
      void queryClient.prefetchQuery({
        queryKey: todoQueryKeys.detail(id),
        queryFn: ({ signal }) => fetchSingleTodo(id, signal),
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Tile became visible — schedule a debounced prefetch.
            if (timeoutId === undefined) {
              timeoutId = setTimeout(() => {
                timeoutId = undefined;
                prefetch();
                observer.disconnect();
              }, PREFETCH_DELAY_MS);
            }
          } else if (timeoutId !== undefined) {
            // Tile left the viewport before the debounce fired — cancel it.
            clearTimeout(timeoutId);
            timeoutId = undefined;
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [id, queryClient]);

  return elementRef;
};
