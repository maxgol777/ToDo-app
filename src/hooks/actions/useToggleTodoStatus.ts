import type { Todo } from "../state/todo/types";

type EditTodoFn = (todo: Todo) => Promise<unknown>;

export const createToggleTodoStatus = (editTodo: EditTodoFn) => {
  return (todo: Todo) => {
    const toggledStatus = todo.status === "Done" ? "Pending" : "Done";
    void editTodo({ ...todo, status: toggledStatus });
  };
};
