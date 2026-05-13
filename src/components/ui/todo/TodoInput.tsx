import { useState } from "react";
import { useTodoStateHandler } from "../../../context/todo/GlobalState";

export const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useTodoStateHandler();

  const handleAdd = () => {
    const title = inputValue.trim();
    if (!title) return;
    addTodo(title);
    setInputValue("");
  };

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new item"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="todo-button" type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
