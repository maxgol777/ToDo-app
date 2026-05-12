import { useState } from "react";

type TodoInputProps = {
  onAdd: (title: string) => void;
};

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [newValueItem, setNewValueItem] = useState("");

  const handleAdd = () => {
    const title = newValueItem.trim();
    if (!title) return;

    onAdd(title);
    setNewValueItem("");
  };

  return (
    <div className="todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new item"
        value={newValueItem}
        onChange={(event) => setNewValueItem(event.target.value)}
      />
      <button className="todo-button" type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
