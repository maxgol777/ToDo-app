import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

const FIXED_DATE = new Date("2026-05-22T12:00:00Z");

const renderFooter = () => {
  render(<Footer />);
  return {
    getFooter: () => screen.getByRole("contentinfo"),
  };
};

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a footer element with the app name and current year", () => {
    const view = renderFooter();
    const footer = view.getFooter();

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent("© 2026 ToDo App");
  });
});
