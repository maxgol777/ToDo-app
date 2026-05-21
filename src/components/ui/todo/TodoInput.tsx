import { useAddTodo } from "../../../hooks/actions/useAddTodo";
import { TextInput } from "../common/TextInput";
import { useForm } from "@tanstack/react-form";
import type { SyntheticEvent } from "react";

const MIN_TITLE_LENGTH = 3;
const TITLE_REQUIRED_ERROR = "Title is required";
const TITLE_LENGTH_ERROR = `Title must be at least ${MIN_TITLE_LENGTH} characters long`;
const submitButtonClasses =
  "inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 sm:w-auto";

const validateTitle = (title: string) => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return TITLE_REQUIRED_ERROR;
  }

  if (trimmedTitle.length < MIN_TITLE_LENGTH) {
    return TITLE_LENGTH_ERROR;
  }

  return undefined;
};

export const TodoInput = () => {
  const { addTodo, isPending } = useAddTodo();

  const form = useForm({
    defaultValues: { title: "" },

    onSubmit: async ({ value }) => {
      const title = value.title.trim();
      await addTodo(title);
      form.reset();
    },
  });

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => validateTitle(value),
          }}
        >
          {(field) => (
            <div className="flex-1">
              <TextInput
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Add a new item"
              />
              {field.state.meta.errors.length > 0 ? (
                <p className="mt-1 text-left text-xs font-medium text-red-700 dark:text-red-400">
                  {field.state.meta.errors.join(", ")}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        <button className={submitButtonClasses} type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100"
                aria-hidden="true"
              />
              Adding...
            </span>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </form>
  );
};
