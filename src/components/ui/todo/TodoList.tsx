import { useAtomValue } from "jotai";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import "../../../styles/todo/todo-list.css";
import { todosAtom } from "../../../state/todo/atoms";
import { useFetchTodos } from "../../../hooks/useFetchTodos.ts";

export const TodoList = () => {
  const todos = useAtomValue(todosAtom);
  const { isLoading, error } = useFetchTodos();
  
  const renderBody = () => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="error">Could not load todos: {error}</p>;
    if (todos.length === 0) return <p>No items to show</p>;
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  };

  return (
    <section className="todo-list">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-items">{renderBody()}</div>
      <TodoInput />
    </section>
  );
};
