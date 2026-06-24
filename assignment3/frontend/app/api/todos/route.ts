import { NextResponse } from "next/server";
import { createTodo, getTodos } from "../../../lib/todoApi";
import { getDateKey } from "../../../utils/date";

export async function GET() {
  const todos = await getTodos();

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const todo = await createTodo(
    String(body.text ?? ""),
    String(body.date ?? getDateKey(new Date())),
  );

  return NextResponse.json(todo, { status: 201 });
}
