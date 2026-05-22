type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const TextInput = ({ value, onChange, placeholder, className }: TextInputProps) => {
  const inputClassName = className ? `text-input-base ${className}` : "text-input-base";

  return (
    <input
      className={inputClassName}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
