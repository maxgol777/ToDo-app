import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoList } from "./TodoList";
import { API_BASE_URL } from "../../../config/api";

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
};

const buildFetchResponse = (body: unknown, ok = true, status = 200): Response =>
  ({
    ok,
    status,
    json: () => Promise.resolve(body),
  }) as unknown as Response;

describe("TodoList", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders todos returned from the API", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(
      buildFetchResponse([
        { id: 1, title: "Write tests", status: "Pending" },
        { id: 2, title: "Ship feature", status: "Done" },
      ]),
    );

    renderWithProviders(<TodoList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Ship feature")).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/todos`,
      expect.objectContaining({ signal: expect.anything() }),
    );
  });

  it("shows an empty state when the API returns no todos", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(buildFetchResponse([]));

    renderWithProviders(<TodoList />);

    expect(await screen.findByText("No items to show")).toBeInTheDocument();
  });

  it("shows an error message when the API responds with a non-OK status", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(buildFetchResponse(null, false, 500));

    renderWithProviders(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText(/Could not load todos/)).toBeInTheDocument();
    });
    expect(screen.getByText(/status 500/)).toBeInTheDocument();
  });
});
