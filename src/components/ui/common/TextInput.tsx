import "../../../styles/todo/todo-input.css";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const TextInput = ({
  value,
  onChange,
  placeholder,
  className = "todo-input",
}: TextInputProps) => {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
