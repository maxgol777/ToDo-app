import { useAtomValue } from "jotai";
import { globalStateValue } from "../../../context/todo/GlobalState";
import { useState } from "react";

export const TodoInput = () => {
  const [value, setValue] = useState("");
  const { addTodo } = useAtomValue(globalStateValue);

  const handleAdd = () => {
    const title = value.trim();
    if (!title) return;
    addTodo(title);
    setValue("");
  };

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new item"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="todo-button" type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
