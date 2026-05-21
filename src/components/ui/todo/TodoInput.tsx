import { useAddTodo } from "../../../hooks/actions/useAddTodo";
import { TextInput } from "../common/TextInput";
import { useForm } from "@tanstack/react-form";
import type { SyntheticEvent } from "react";

const MIN_TITLE_LENGTH = 3;
const TITLE_REQUIRED_ERROR = "Title is required";
const TITLE_LENGTH_ERROR = `Title must be at least ${MIN_TITLE_LENGTH} characters long`;

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
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="todo-input-row">
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => validateTitle(value),
          }}
        >
          {(field) => (
            <div className="todo-input-wrapper">
              <TextInput
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Add a new item"
              />
              {field.state.meta.errors.length > 0 ? (
                <p className="todo-input-error">{field.state.meta.errors.join(", ")}</p>
              ) : null}
            </div>
          )}
        </form.Field>

        <button
          className="todo-submit-button"
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className="todo-submit-content">
              <span className="todo-submit-spinner" aria-hidden="true" />
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
