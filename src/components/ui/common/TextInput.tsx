type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const baseInputClasses =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-300 dark:focus:ring-violet-900/50";

export const TextInput = ({
  value,
  onChange,
  placeholder,
  className,
}: TextInputProps) => {
  const inputClassName = className ? `${baseInputClasses} ${className}` : baseInputClasses;

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
