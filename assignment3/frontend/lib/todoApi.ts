import type { Todo } from "../types/todo";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getTodos() {
  return request<Todo[]>("/todos");
}

export function getTodo(todoId: number) {
  return getTodos().then((todos) => {
    const todo = todos.find((item) => item.id === todoId);

    if (!todo) {
      throw new Error("Todo not found.");
    }

    return todo;
  });
}

export function createTodo(text: string, date: string) {
  return request<Todo>("/todos", {
    method: "POST",
    body: JSON.stringify({ text, date }),
  });
}

export function updateTodo(
  todoId: number,
  text: string,
  completed: boolean,
  date: string,
) {
  return request<Todo>(`/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify({ text, completed, date }),
  });
}

export function deleteTodo(todoId: number) {
  return request<void>(`/todos/${todoId}`, {
    method: "DELETE",
  });
}
