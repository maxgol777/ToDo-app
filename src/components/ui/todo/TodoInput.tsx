import { useTodoStateHandler } from "../../../state/todo/useTodoStateHandler";
import { TextInput } from "../common/TextInput";
import "../../../styles/todo/todo-input.css";
import "../../../styles/todo/todo-button.css";
import { useForm } from "@tanstack/react-form";

export const TodoInput = () => {
  const { addTodo } = useTodoStateHandler();

  const form = useForm({
    defaultValues: { title: "" },
    onSubmit: ({ value }) => {
      const title = value.title.trim();
      addTodo(title);
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="todo-form">
        <form.Field
          name="title"
          validators={{
            // If validation is a heavy operation, we use onChangeAsync
            onChangeAsync: ({ value }) => {
              if (value.trim().length < 3) {
                return "Title must be at least 3 characters long";
              }
            },
          }}
          children={(field) => (
            <div className="todo-input-wrapper">
              <TextInput
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                placeholder="Add a new item"
              />
              {field.state.meta.errors && (
                <p className="error">{field.state.meta.errors.toString()}</p>
              )}
            </div>
          )}
        />

        <button className="todo-button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};
