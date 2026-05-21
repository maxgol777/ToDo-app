import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../services/todo/todoApi.ts";
import { todoQueryKeys } from "../services/todo/queryKeys.ts";

const ARTIFICIAL_DELAY_MS = 1000;

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (title: string) => {
      // Added for test purpose
      await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));
      return addTodo(title);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys.todos });
    },
  });

  return {
    addTodo: (title: string) => mutateAsync(title),
    isPending,
  };
};
