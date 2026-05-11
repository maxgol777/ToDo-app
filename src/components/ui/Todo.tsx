import "../../styles/todo.css";
import { useState } from "react";

const INITIAL_TODOS = [
  { id: 1, title: "buy groceries", done: false },
  { id: 2, title: "go to the gym", done: false },
  { id: 3, title: "read a book", done: false },
  { id: 4, title: "watch a movie", done: false },
  { id: 5, title: "go for a walk", done: false },
];

const Todo = (props: {
  title: string;
  done: boolean;
  onComplete: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="todo-item">
      <h3 className="todo-title">{props.title}</h3>
      <p
        style={{ color: props.done ? "green" : "red" }}
        className="todo-status"
      >
        {props.done ? "Done" : "Pending"}
      </p>

      <button className="todo-button" type="button" onClick={props.onComplete}>
        {props.done ? "Undo" : "Complete"}
      </button>
      <button
        className="todo-button todo-button-danger"
        type="button"
        onClick={props.onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export const TodoList = () => {
  const [items, setItems] = useState(INITIAL_TODOS);
  const [newValueItem, setNewValueItem] = useState("");

  const addItem = (item: string) => {
    if (newValueItem.trim() === "") return;
    const newItem = { id: Date.now(), title: item, done: false };
    setItems([...items, newItem]);
    setNewValueItem("");
  };

  const toggleDone = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    console.log("removeItem", id);
    setItems(items.filter((item) => item.id !== id));
  };

  const todoElements = items.map((todo) => {
    return (
      <Todo
        key={todo.id}
        title={todo.title}
        done={todo.done}
        onComplete={() => toggleDone(todo.id)}
        onDelete={() => removeItem(todo.id)}
      />
    );
  });

  return (
    <section className="todo-list">
      <h2 className="todo-list-title">What should you do today?</h2>
      <div className="todo-items">{todoElements}</div>
      <br />
      <input
        type="text"
        placeholder="Add a new item"
        value={newValueItem}
        onChange={(e) => setNewValueItem(e.target.value)}
      />
      <button onClick={() => addItem(newValueItem)}>Add</button>
    </section>
  );
};
