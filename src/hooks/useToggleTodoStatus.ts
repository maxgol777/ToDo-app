import type { Todo } from "../state/todo/types";
import { useEditTodo } from "./useEditTodo";

export const useToggleTodoStatus = () => {
  const editTodo = useEditTodo();

  return async (todo: Todo) => {
    const toggledStatus = todo.status === "Done" ? "Pending" : "Done";
    await editTodo({ ...todo, status: toggledStatus });
  };
};
