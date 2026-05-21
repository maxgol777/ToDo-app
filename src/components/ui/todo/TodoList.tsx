import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { useFetchTodos } from "../../../hooks/fetching/useFetchTodos.ts";

export const TodoList = () => {
  const { todos, isLoading, error } = useFetchTodos();

  const renderBody = () => {
    if (isLoading) return <p className="todo-list-state">Loading...</p>;
    if (error) {
      return <p className="todo-list-state-error">Could not load todos: {error}</p>;
    }
    if (todos.length === 0) {
      return <p className="todo-list-state">No items to show</p>;
    }
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  };

  return (
    <section className="todo-list-shell">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-list-items">{renderBody()}</div>
      <TodoInput />
    </section>
  );
};
