import { NextResponse } from "next/server";
import { deleteTodo, updateTodo } from "../../../../lib/todoApi";
import { getDateKey } from "../../../../utils/date";

type TodoRouteContext = {
  params: Promise<{
    todoId: string;
  }>;
};

export async function PUT(request: Request, context: TodoRouteContext) {
  const { todoId } = await context.params;
  const body = await request.json();
  const todo = await updateTodo(
    Number(todoId),
    String(body.text ?? ""),
    Boolean(body.completed),
    String(body.date ?? getDateKey(new Date())),
  );

  return NextResponse.json(todo);
}

export async function DELETE(_request: Request, context: TodoRouteContext) {
  const { todoId } = await context.params;

  await deleteTodo(Number(todoId));

  return new NextResponse(null, { status: 204 });
}
