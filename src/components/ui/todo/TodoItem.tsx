import { useNavigate } from "react-router";
import { useTodoActions } from "../../../state/todo/useTodoActions";
import type { Todo } from "../../../state/todo/types";
import "../../../styles/todo/todo-item.css";
import "../../../styles/todo/todo-status.css";
import "../../../styles/todo/todo-button.css";

type TodoItemProps = { todo: Todo };

export const TodoItem = ({ todo }: TodoItemProps) => {
  const navigate = useNavigate();
  const { toggleTodo, removeTodo } = useTodoActions();
  const isDone = todo.status === "Done";

  return (
    <div className="todo-item">
      <button
        type="button"
        className="todo-title todo-title-button"
        onClick={() => navigate(`/todos/${todo.id}`)}
      >
        {todo.title}
      </button>
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
