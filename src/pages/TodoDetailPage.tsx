import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { TextInput } from "../components/ui/common/TextInput";
import "../styles/page.css";
import "../styles/todo/todo-status.css";
import "../styles/todo/todo-button.css";
import { useTodoActions } from "../hooks/useTodoActions";
import { useFetchTodos } from "../hooks/useFetchTodos";

export const TodoDetailPage = () => {
  const { todos } = useFetchTodos();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deleteTodo, editTodo, toggleTodoStatus } = useTodoActions();

  const numericId = Number(id);
  const todo = Number.isFinite(numericId) ? todos.find((item) => item.id === numericId) : undefined;
  const [titleDraft, setTitleDraft] = useState(todo?.title ?? "");

  if (!todo) {
    return (
      <section className="page-card">
        <h1 className="page-title">ToDo not found</h1>
        <p>We couldn&apos;t find a ToDo with id &quot;{id}&quot;.</p>
        <div className="page-actions">
          <button type="button" className="todo-button" onClick={() => navigate("/")}>
            Back to list
          </button>
        </div>
      </section>
    );
  }

  const isDone = todo.status === "Done";

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    await navigate("/", { replace: true });
  };

  const handleSave = async () => {
    const title = titleDraft.trim();
    if (!title) return;
    await editTodo({ ...todo, title });
    await navigate("/", { replace: true });
  };

  return (
    <section className="page-card">
      <Link to="/" className="page-back-link">
        &larr; Back to list
      </Link>

      <div>
        <TextInput value={titleDraft} onChange={setTitleDraft} placeholder="ToDo title" />
        <p className={`todo-status ${isDone ? "todo-status-done" : "todo-status-pending"}`}>
          Status: {todo.status}
        </p>

        <div className="page-actions">
          <button type="button" className="todo-button" onClick={() => toggleTodoStatus(todo)}>
            {isDone ? "Mark as Pending" : "Mark as Done"}
          </button>
          <button type="button" className="todo-button todo-button-danger" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="todo-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </section>
  );
};
