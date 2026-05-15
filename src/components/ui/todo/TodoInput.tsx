import { useState } from "react";
import { useTodoStateHandler } from "../../../state/todo/useTodoStateHandler";
import { TextInput } from "../common/TextInput";
import "../../../styles/todo/todo-input.css";
import "../../../styles/todo/todo-button.css";

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
      <TextInput value={inputValue} onChange={setInputValue} placeholder="Add a new item" />
      <button className="todo-button" type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
