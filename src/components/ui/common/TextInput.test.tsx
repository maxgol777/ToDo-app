import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders an input with the given value and placeholder", () => {
    render(<TextInput value="hello" onChange={() => {}} placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("hello");
    expect(input.type).toBe("text");
  });

  it("applies the base class and the optional className together", () => {
    render(<TextInput value="" onChange={() => {}} className="extra-class" />);

    const input = screen.getByRole("textbox");
    expect(input.className).toBe("text-input-base extra-class");
  });

  it("applies only the base class when no className is provided", () => {
    render(<TextInput value="" onChange={() => {}} />);

    const input = screen.getByRole("textbox");
    expect(input.className).toBe("text-input-base");
  });

  it("calls onChange with the new value when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TextInput value="" onChange={handleChange} placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "ab");

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(1, "a");
    expect(handleChange).toHaveBeenNthCalledWith(2, "b");
  });
});
