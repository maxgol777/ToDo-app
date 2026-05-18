import { useTodoActions } from "../../../state/todo/useTodoActions";
import type { Todo } from "./types";

type TodoItemProps = { todo: Todo };

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, removeTodo } = useTodoActions();
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
};
