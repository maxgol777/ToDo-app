import type { TodoActions } from "../state/todo/types";
import { useAddTodo } from "./useAddTodo";
import { useDeleteTodo } from "./useDeleteTodo";
import { useEditTodo } from "./useEditTodo";
import { useToggleTodoStatus } from "./useToggleTodoStatus";

export const useTodoActions = (): TodoActions => {
  const { addTodo } = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodo();
  const toggleTodoStatus = useToggleTodoStatus();

  return {
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodoStatus,
  };
};
