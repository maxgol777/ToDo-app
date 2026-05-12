import { memo } from "react";
import type { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoItem = memo(({ todo, onToggleStatus, onDelete }: TodoItemProps) => {
  const isDone = todo.status === "Done";

  return (
    <div className="todo-item">
      <h3 className="todo-title">{todo.title}</h3>
      <p className={`todo-status ${isDone ? "todo-status-done" : "todo-status-pending"}`}>
        {todo.status}
      </p>

      <div className="todo-actions">
        <button className="todo-button" type="button" onClick={() => onToggleStatus(todo.id)}>
          {isDone ? "Undo" : "Complete"}
        </button>
        <button
          className="todo-button todo-button-danger"
          type="button"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
