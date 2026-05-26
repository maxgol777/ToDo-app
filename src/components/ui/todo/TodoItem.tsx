import { memo } from "react";
import { useNavigate } from "react-router";
import type { Todo } from "../../../state/todo/types";
import { useTodoActions } from "../../../hooks/actions/useTodoActions";
import { useIsMobile } from "../../../hooks/useMediaQuery";
import { SwipeToDelete } from "./SwipeToDelete";

type TodoItemProps = { todo: Todo };

export const TodoItem = memo(({ todo }: TodoItemProps) => {
  const navigate = useNavigate();
  const { deleteTodo, toggleTodoStatus } = useTodoActions();
  const isMobile = useIsMobile();
  const isDone = todo.status === "Done";

  const card = (
    <div className="todo-item rounded-2xl bg-linear-to-br from-white to-zinc-50 shadow-md sm:rounded-lg sm:bg-none sm:shadow-none dark:from-zinc-900 dark:to-zinc-800/70 dark:sm:bg-none">
      <button
        type="button"
        className="todo-item-title-button text-lg font-semibold sm:text-base sm:font-normal"
        onClick={() => navigate(`/todos/${todo.id}`)}
      >
        {todo.title}
      </button>
      <p
        className={`todo-item-status ${isDone ? "todo-item-status-done" : "todo-item-status-pending"}`}
      >
        {todo.status}
      </p>

      <div className="todo-item-actions">
        <button
          className="todo-item-action-button"
          type="button"
          onClick={() => toggleTodoStatus(todo)}
        >
          {isDone ? "Undo" : "Complete"}
        </button>
        <button
          className="todo-item-danger-button sr-only sm:not-sr-only"
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return <SwipeToDelete onDelete={() => deleteTodo(todo.id)}>{card}</SwipeToDelete>;
  }
  return card;
});
