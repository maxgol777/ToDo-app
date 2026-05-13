import { memo } from "react";
import type { Todo } from "./types";
import { useContext } from "react";
import { TodoContext } from "../../../context/todo/TodoContext";

type TodoItemProps = { todo: Todo };

export const TodoItem = memo(({ todo }: TodoItemProps) => {
  const { toggleTodo, removeTodo } = useContext(TodoContext);
  const isDone = todo.status === "Done";

  return (
    <div className="todo-item">
      <h3 className="todo-title">{todo.title}</h3>
      <p className={`todo-status ${isDone ? "todo-status-done" : "todo-status-pending"}`}>
        {todo.status}
      </p>

      <div className="todo-actions">
        <button className="todo-button" type="button" onClick={() => toggleTodo(todo.id)}>
          {isDone ? "Undo" : "Complete"}
        </button>
        <button
          className="todo-button todo-button-danger"
          type="button"
          onClick={() => removeTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
