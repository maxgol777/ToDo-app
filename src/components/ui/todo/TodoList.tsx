import { TodoItem } from "./TodoItem";
import { TodoInput } from "./TodoInput";
import { useFetchTodos } from "../../../hooks/fetching/useFetchTodos.ts";

export const TodoList = () => {
  const { todos, isLoading, error } = useFetchTodos();

  const renderBody = () => {
    if (isLoading) return <p className="text-left text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>;
    if (error) {
      return (
        <p className="text-left text-sm font-medium text-red-700 dark:text-red-400">
          Could not load todos: {error}
        </p>
      );
    }
    if (todos.length === 0) {
      return <p className="text-left text-sm text-zinc-500 dark:text-zinc-400">No items to show</p>;
    }
    return todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-3xl rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:mt-10 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/80">
      <h2 className="mb-4 text-left text-xl font-medium tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-100">
        What should you do today?
      </h2>
      <div className="flex flex-col gap-3">{renderBody()}</div>
      <TodoInput />
    </section>
  );
};
