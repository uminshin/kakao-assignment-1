"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../lib/todoApi";
import { getDateKey } from "../utils/date";

export async function readTodosAction() {
  return getTodos();
}

export async function readTodoAction(todoId: number) {
  return getTodo(todoId);
}

export async function createTodoAction(formData: FormData) {
  const text = String(formData.get("text") ?? "").trim();
  const date = String(formData.get("date") ?? getDateKey(new Date()));

  if (text === "") {
    throw new Error("Todo text is required.");
  }

  await createTodo(text, date);
  revalidatePath("/todos");
  redirect(`/todos?date=${date}`);
}

export async function updateTodoAction(todoId: number, formData: FormData) {
  const text = String(formData.get("text") ?? "").trim();
  const completed = formData.get("completed") === "on";
  const date = String(formData.get("date") ?? getDateKey(new Date()));

  if (text === "") {
    throw new Error("Todo text is required.");
  }

  await updateTodo(todoId, text, completed, date);
  revalidatePath("/todos");
  redirect(`/todos?date=${date}`);
}

export async function deleteTodoAction(todoId: number) {
  await deleteTodo(todoId);
  revalidatePath("/todos");
}
