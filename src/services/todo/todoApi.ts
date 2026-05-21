import { API_BASE_URL } from "../../config/api.ts";
import type { Todo } from "../../state/todo/types";
import { array, number, object, parse, picklist, string } from "valibot";

type ApiTodo = {
  id: number;
  title: string;
  status: Todo["status"];
};

const apiTodoSchema = object({
  id: number(),
  title: string(),
  status: picklist(["Done", "Pending"]),
});

const apiTodosSchema = array(apiTodoSchema);

const mapApiTodo = (apiTodo: ApiTodo): Todo => ({
  id: apiTodo.id,
  title: apiTodo.title,
  status: apiTodo.status,
});

const assertOkResponse = (response: Response, message: string): void => {
  if (!response.ok) {
    throw new Error(message);
  }
};

const parseTodosPayload = (payload: unknown): ApiTodo[] => {
  try {
    return parse(apiTodosSchema, payload);
  } catch {
    throw new Error("Received malformed todos payload from the server");
  }
};

export const fetchTodos = async (signal?: AbortSignal): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todos`, { signal });
  assertOkResponse(response, `Failed to load todos (status ${response.status})`);

  const payload: unknown = await response.json();
  const apiTodos = parseTodosPayload(payload);
  return apiTodos.map(mapApiTodo);
};

export const addTodo = async (title: string) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  assertOkResponse(response, `Failed to create todo (status ${response.status})`);
};

export const deleteTodo = async (id: number, signal?: AbortSignal) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
    signal,
  });
  assertOkResponse(response, `Failed to delete todo (status ${response.status})`);
};

export const updateTodo = async (todo: Todo, signal?: AbortSignal) => {
  const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: todo.title, status: todo.status }),
    signal,
  });
  assertOkResponse(response, `Failed to update todo (status ${response.status})`);
};
