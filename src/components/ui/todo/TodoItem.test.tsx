import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../../../state/todo/types";

const navigateMock = vi.fn();
const deleteTodoMock = vi.fn();
const toggleTodoStatusMock = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../../../hooks/actions/useTodoActions", () => ({
  useTodoActions: () => ({
    deleteTodo: deleteTodoMock,
    toggleTodoStatus: toggleTodoStatusMock,
  }),
}));

const buildTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  title: "Write unit tests",
  status: "Pending",
  ...overrides,
});

const renderTodoItem = (todoOverrides: Partial<Todo> = {}) => {
  const todo = buildTodo(todoOverrides);
  const user = userEvent.setup();

  render(<TodoItem todo={todo} />);

  const getTitleButton = () => screen.getByRole("button", { name: todo.title });
  const getStatusText = () => screen.getByText(todo.status);
  const getToggleButton = () =>
    screen.getByRole("button", { name: todo.status === "Done" ? "Undo" : "Complete" });
  const getDeleteButton = () => screen.getByRole("button", { name: "Delete" });

  return {
    todo,
    getTitleButton,
    getStatusText,
    getToggleButton,
    getDeleteButton,
    clickTitle: async () => user.click(getTitleButton()),
    clickToggle: async () => user.click(getToggleButton()),
    clickDelete: async () => user.click(getDeleteButton()),
  };
};

describe("TodoItem", () => {
  beforeEach(() => {
    //  reset all mocks (navigateMock, deleteTodoMock, toggleTodoStatusMock)
    vi.clearAllMocks();
  });

  it("renders a pending todo with pending status styles and actions", () => {
    const view = renderTodoItem();

    expect(view.getTitleButton()).toBeInTheDocument();
    // important part is which style is applied — pending vs done
    expect(view.getStatusText()).toHaveClass("todo-item-status-pending");
    expect(view.getToggleButton()).toBeInTheDocument();
    expect(view.getDeleteButton()).toBeInTheDocument();
  });

  it("renders a done todo with done status styles and undo action", () => {
    const view = renderTodoItem({ status: "Done" });

    expect(view.getStatusText()).toHaveClass("todo-item-status-done");
    expect(view.getToggleButton()).toBeInTheDocument();
  });

  it("navigates to todo details when the title button is clicked", async () => {
    const view = renderTodoItem({ id: 42, title: "Open details" });
    await view.clickTitle();

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/todos/42");
  });

  it("calls toggleTodoStatus with the todo when action button is clicked", async () => {
    const view = renderTodoItem({ title: "Toggle status" });
    await view.clickToggle();

    expect(toggleTodoStatusMock).toHaveBeenCalledTimes(1);
    expect(toggleTodoStatusMock).toHaveBeenCalledWith(view.todo);
  });

  it("calls deleteTodo with todo id when delete button is clicked", async () => {
    const view = renderTodoItem({ id: 99, title: "Remove me" });
    await view.clickDelete();

    expect(deleteTodoMock).toHaveBeenCalledTimes(1);
    expect(deleteTodoMock).toHaveBeenCalledWith(99);
  });
});
