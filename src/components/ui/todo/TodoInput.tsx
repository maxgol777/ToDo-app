import { useState } from "react";

type TodoInputProps = {
  onAdd: (title: string) => void;
};

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const title = value.trim();
    if (!title) return;

    onAdd(title);
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
