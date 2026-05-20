import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const controller = new AbortController();

  const { mutateAsync } = useMutation({
    mutationFn: (title: string) => addTodo(title, controller.signal),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys });
    },
  });

  return (title: string) => mutateAsync(title);
};
