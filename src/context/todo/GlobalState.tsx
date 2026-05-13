import { atom, useAtomValue, useSetAtom } from "jotai";
import type { Todo } from "../../components/ui/todo/types";

export type TodoContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "buy groceries1", status: "Pending" },
  { id: 2, title: "go to the gym1", status: "Pending" },
  { id: 3, title: "read a book1", status: "Pending" },
  { id: 4, title: "watch a movie1", status: "Pending" },
  { id: 5, title: "go for a walk1", status: "Pending" },
];

const todosAtom = atom<Todo[]>(INITIAL_TODOS);

const addTodoAtom = atom(null, (get, set, title: string) => {
  const todos = get(todosAtom);
  set(todosAtom, [...todos, { id: Date.now(), title: title, status: "Pending" }]);
});

const toggleTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.map((todo) =>
      todo.id === id ? { ...todo, status: todo.status === "Done" ? "Pending" : "Done" } : todo,
    ),
  );
});

const removeTodoAtom = atom(null, (get, set, id: number) => {
  const todos = get(todosAtom);
  set(
    todosAtom,
    todos.filter((todo) => todo.id !== id),
  );
});

export const useTodoStateHandler = (): TodoContextValue => {
  const todos = useAtomValue(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);
  return { todos, addTodo, toggleTodo, removeTodo };
};
