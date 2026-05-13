import { atom, getDefaultStore } from "jotai";
import type { Todo } from "../../components/ui/todo/types";

export type TodoContextValue = {
    //todos: Todo[];
    todosAtomValue: () => Todo[];
    addTodo: (title: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
  };

const INITIAL_TODOS2: Todo[] = [
  { id: 1, title: "buy groceries1", status: "Pending" },
  { id: 2, title: "go to the gym1", status: "Pending" },
  { id: 3, title: "read a book1", status: "Pending" },
  { id: 4, title: "watch a movie1", status: "Pending" },
  { id: 5, title: "go for a walk1", status: "Pending" },
];

const todosAtom = atom<Todo[]>(INITIAL_TODOS2);

const store = getDefaultStore();

const addTodo = (title: string) => {
  store.set(todosAtom, (current) => [
    ...current,
    { id: Date.now(), title, status: "Pending" },
  ]);
};

const toggleTodo = (id: number) => {
  store.set(todosAtom, (current) =>
    current.map((todo) =>
      todo.id === id ? { ...todo, status: todo.status === "Done" ? "Pending" : "Done" } : todo,
    ),
  );
};

const removeTodo = (id: number) => {
  store.set(todosAtom, (current) => current.filter((todo) => todo.id !== id));
};

export const globalStateValue = atom<TodoContextValue>((get) => {
  const todos = get(todosAtom);
  return {
    todosAtomValue: () => todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
});
