import { useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { useTodoStateHandler } from "../../../state/todo/useTodoStateHandler";
import "../../../styles/todo/todo-list.css";

export const TodoList = () => {
  const { todos } = useTodoStateHandler();

  const itemElements = useMemo(
    () => todos.map((todo) => <TodoItem key={todo.id} todo={todo} />),
    [todos],
  );

  return (
    <section className="todo-list">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-items">{todos.length > 0 ? itemElements : <p>No items to show</p>}</div>
      <TodoInput />
    </section>
  );
};
