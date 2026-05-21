import { memo } from "react";
import { useNavigate } from "react-router";
import type { Todo } from "../../../state/todo/types";
import { useTodoActions } from "../../../hooks/actions/useTodoActions";

type TodoItemProps = { todo: Todo };

export const TodoItem = memo(({ todo }: TodoItemProps) => {
  const navigate = useNavigate();
  const { deleteTodo, toggleTodoStatus } = useTodoActions();
  const isDone = todo.status === "Done";
  return (
    <div className="todo-item">
      <button
        type="button"
        className="todo-item-title-button"
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
          className="todo-item-danger-button"
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
