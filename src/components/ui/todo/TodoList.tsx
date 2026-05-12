import "../../../styles/todo.css";
import { useCallback, useState } from "react";
import { TodoItem } from "./TodoItem";
import type { Todo } from "./types";
import { TodoInput } from "./TodoInput";

const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "buy groceries", status: "Pending" },
  { id: 2, title: "go to the gym", status: "Pending" },
  { id: 3, title: "read a book", status: "Pending" },
  { id: 4, title: "watch a movie", status: "Pending" },
  { id: 5, title: "go for a walk", status: "Pending" },
];

export const TodoList = () => {
  const [items, setItems] = useState(INITIAL_TODOS);

  const addItem = useCallback((title: string) => {
    const newItem: Todo = { id: Date.now(), title, status: "Pending" };
    setItems((currentItems) => [...currentItems, newItem]);
  }, []);

  const toggleStatus = useCallback((id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Done" ? "Pending" : "Done" }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  return (
    <section className="todo-list">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-items">
        {items.length > 0 ? (
          items.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleStatus={toggleStatus}
              onDelete={removeItem}
            />
          ))
        ) : (
          <p>No items to show</p>
        )}
      </div>
      <TodoInput onAdd={addItem} />
    </section>
  );
};
