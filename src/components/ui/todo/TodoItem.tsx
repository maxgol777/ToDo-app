import { memo } from "react";
import { useNavigate } from "react-router";
import type { Todo } from "../../../state/todo/types";
import { useTodoActions } from "../../../hooks/actions/useTodoActions";

type TodoItemProps = { todo: Todo };
const actionButtonClasses =
  "inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 px-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700";
const dangerButtonClasses =
  "inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70";

export const TodoItem = memo(({ todo }: TodoItemProps) => {
  const navigate = useNavigate();
  const { deleteTodo, toggleTodoStatus } = useTodoActions();
  const isDone = todo.status === "Done";
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-3 sm:flex-row sm:items-center sm:gap-4 dark:border-zinc-800">
      <button
        type="button"
        className="cursor-pointer text-left text-base capitalize text-zinc-800 transition-colors hover:text-violet-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 dark:text-zinc-100 sm:min-w-[220px]"
        onClick={() => navigate(`/todos/${todo.id}`)}
      >
        {todo.title}
      </button>
      <p
        className={`text-sm font-medium capitalize ${isDone ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}
      >
        {todo.status}
      </p>

      <div className="flex flex-wrap gap-2 sm:ml-auto sm:justify-end">
        <button className={actionButtonClasses} type="button" onClick={() => toggleTodoStatus(todo)}>
          {isDone ? "Undo" : "Complete"}
        </button>
        <button className={dangerButtonClasses} type="button" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
});
