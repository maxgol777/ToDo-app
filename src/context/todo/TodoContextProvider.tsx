import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { TodoContext } from "./TodoContext";
import type { Todo } from "../../components/ui/todo/types";
import type { TodoContextValue } from "./TodoContext";

const INITIAL_TODOS: Todo[] = [
  { id: 1, title: "buy groceries", status: "Pending" },
  { id: 2, title: "go to the gym", status: "Pending" },
  { id: 3, title: "read a book", status: "Pending" },
  { id: 4, title: "watch a movie", status: "Pending" },
  { id: 5, title: "go for a walk", status: "Pending" },
];

type TodoContextProviderProps = {
  children: ReactNode;
};

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  const addTodo = useCallback((title: string) => {
    setTodos((current) => [...current, { id: Date.now(), title: title, status: "Pending" }]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, status: todo.status === "Done" ? "Pending" : "Done" } : todo,
      ),
    );
  }, []);

  const removeTodo = useCallback((id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }, []);

  const value: TodoContextValue = { todos, addTodo, toggleTodo, removeTodo };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
