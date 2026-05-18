import "../../../styles/todo.css";
import { useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { useAtomValue } from "jotai";
import { todosAtom } from "../../../state/todo/atoms";

export const TodoList = () => {
  const todos = useAtomValue(todosAtom);

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
