import { describe, it, expect, vi } from "vitest";
import type { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from "./TextInput";

type TextInputProps = ComponentProps<typeof TextInput>;

const renderTextInput = (props: Partial<TextInputProps> = {}) => {
  const onChange = props.onChange ?? vi.fn();
  const mergedProps: TextInputProps = {
    value: "",
    onChange,
    ...props,
  };

  render(<TextInput {...mergedProps} />);

  return {
    getInputByRole: () => screen.getByRole("textbox") as HTMLInputElement,
    getInputByPlaceholder: (placeholder: string) =>
      screen.getByPlaceholderText(placeholder) as HTMLInputElement,
  };
};

describe("TextInput", () => {
  it("renders an input with the given value and placeholder", () => {
    const view = renderTextInput({
      value: "hello",
      placeholder: "Type here",
    });

    const input = view.getInputByPlaceholder("Type here");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("hello");
    expect(input.type).toBe("text");
  });

  it("applies the base class and the optional className together", () => {
    const view = renderTextInput({ className: "extra-class" });

    const input = view.getInputByRole();
    expect(input.className).toBe("text-input-base extra-class");
  });

  it("applies only the base class when no className is provided", () => {
    const view = renderTextInput();

    const input = view.getInputByRole();
    expect(input.className).toBe("text-input-base");
  });

  it("calls onChange with the new value when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const view = renderTextInput({
      onChange: handleChange,
      placeholder: "Type here",
    });

    const input = view.getInputByPlaceholder("Type here");
    await user.type(input, "ab");
    
    // 2 - because 2 symbols: ab
    expect(handleChange).toHaveBeenCalledTimes(2);
    // check what value was passed to onChange on each keystroke
    expect(handleChange).toHaveBeenNthCalledWith(1, "a");
    expect(handleChange).toHaveBeenNthCalledWith(2, "b");
  });
});
