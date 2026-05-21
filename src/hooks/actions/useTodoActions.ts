import type { TodoActions } from "../../state/todo/types";
import { useAddTodo } from "./useAddTodo";
import { useDeleteTodo } from "./useDeleteTodo";
import { useEditTodo } from "./useEditTodo";
import { createToggleTodoStatus } from "./useToggleTodoStatus";

export const useTodoActions = (): TodoActions => {
  const { addTodo } = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodo();
  const toggleTodoStatus = createToggleTodoStatus(editTodo);

  return {
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodoStatus,
  };
};
