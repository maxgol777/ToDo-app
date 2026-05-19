import { atom } from "jotai";
import { todosAtom } from "./atoms";

export const toggleTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.map((todo) =>
      todo.id === id ? { ...todo, status: todo.status === "Done" ? "Pending" : "Done" } : todo,
    ),
  );
});

export const removeTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.filter((todo) => todo.id !== id),
  );
});

export const editTodoAtom = atom(null, (get, set, payload: { id: number; title: string }) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.map((todo) => (todo.id === payload.id ? { ...todo, title: payload.title } : todo)),
  );
});
