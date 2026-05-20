import type { Todo } from "../state/todo/types";
import { useEditTodo } from "./useEditTodo";

export const useToggleTodoStatus = () => {
  const editTodo = useEditTodo();

  return (todo: Todo) => {
    const toggledStatus = todo.status === "Done" ? "Pending" : "Done";
    void editTodo({ ...todo, status: toggledStatus });
  };
};
