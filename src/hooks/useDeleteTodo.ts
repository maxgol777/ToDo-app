import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys });
    },
  });

  return (id: number) => mutateAsync(id);
};
