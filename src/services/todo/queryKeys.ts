export const todoQueryKeys = {
  todos: ["todos"] as const,
  detail: (id: number) => ["todo", id] as const,
};
