import { memo } from "react";
import { useNavigate } from "react-router";
import type { Todo } from "../../../state/todo/types";
import "../../../styles/todo/todo-item.css";
import "../../../styles/todo/todo-status.css";
import "../../../styles/todo/todo-button.css";
import "../../../styles/todo/error.css";
import { useDeleteTodo } from "../../../hooks/useDeleteTodo";
import { useEditTodo } from "../../../hooks/useEditTodo";

type TodoItemProps = { todo: Todo };

export const TodoItem = memo(({ todo }: TodoItemProps) => {
  const navigate = useNavigate();
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodo();
  const isDone = todo.status === "Done";

  const handleToggle = async () => {
    const toggledStatus = isDone ? "Pending" : "Done";
    await editTodo({ ...todo, status: toggledStatus });
  };

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
        <button className="todo-button" type="button" onClick={() => handleToggle()}>
          {isDone ? "Undo" : "Complete"}
        </button>
        <button
          className="todo-button todo-button-danger"
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
});
