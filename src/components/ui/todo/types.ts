export type TodoStatus = "Done" | "Pending";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
};

export type TodoItemProps = {
  todo: Todo;
  onToggleStatus: (id: number) => void;
  onDelete: (id: number) => void;
};

export type TodoInputProps = {
  onAdd: (title: string) => void;
};
