import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (title: string) => addTodo(title),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys });
    },
  });

  return {
    addTodo: (title: string) => mutateAsync(title),
    isPending,
  };
};
