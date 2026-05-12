import "../../../styles/todo.css";
import { useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export const TodoList = () => {
  const { todos } = useContext(TodoContext);

  // useMemo is not nessessary here, because we dont have any expensive calculations
  // it was added just to demonstrate the use of useMemo
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
