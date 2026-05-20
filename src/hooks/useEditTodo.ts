import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";
import type { Todo } from "../state/todo/types";

export const useEditTodo = () => {
  const queryClient = useQueryClient();
  const controller = new AbortController();

  const { mutateAsync } = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo, controller.signal),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys });
    },
  });

  return (todo: Todo) => mutateAsync(todo);
};
