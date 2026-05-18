import { useTodoActions } from "../../../state/todo/useTodoActions";
import { TextInput } from "../common/TextInput";
import "../../../styles/todo/todo-input.css";
import "../../../styles/todo/todo-button.css";
import "../../../styles/todo/error.css";
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
  const { addTodo } = useTodoActions();

  const form = useForm({
    defaultValues: { title: "" },

    onSubmit: ({ value }) => {
      const title = value.title.trim();
      addTodo(title);
      form.reset();
    },
  });

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="todo-form">
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
                <p className="error">{field.state.meta.errors.join(", ")}</p>
              ) : null}
            </div>
          )}
        </form.Field>

        <button className="todo-button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};
