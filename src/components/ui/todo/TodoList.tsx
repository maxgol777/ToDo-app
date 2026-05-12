import "../../../styles/todo.css";
import { useCallback, useMemo } from "react";
import { TodoItem } from "./TodoItem";
import type { Todo } from "./types";
import { TodoInput } from "./TodoInput";
import { TodoContext } from "./TodoContext";
import { useContext } from "react";

export const TodoList = () => {
  const { items, setItems } = useContext(TodoContext);

  const addItem = useCallback(
    (title: string) => {
      const newItem: Todo = { id: Date.now(), title, status: "Pending" };
      setItems((currentItems) => [...currentItems, newItem]);
    },
    [setItems],
  );

  const toggleStatus = useCallback(
    (id: number) => {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "Done" ? "Pending" : "Done" }
            : item,
        ),
      );
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: number) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    },
    [setItems],
  );

  // useMemo is not nessessary here, because we dont have any expensive calculations
  // it was added just to demonstrate the use of useMemo
  const itemElements = useMemo(
    () =>
      items.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={toggleStatus}
          onDelete={removeItem}
        />
      )),
    [items, toggleStatus, removeItem],
  );

  return (
    <section className="todo-list">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-items">
        {items.length > 0 ? itemElements : <p>No items to show</p>}
      </div>
      <TodoInput onAdd={addItem} />
    </section>
  );
};
