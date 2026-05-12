export type TodoStatus = "Done" | "Pending";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
};
