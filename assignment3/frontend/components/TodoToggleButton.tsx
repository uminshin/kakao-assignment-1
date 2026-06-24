"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Todo } from "../types/todo";

type TodoToggleButtonProps = {
  todo: Todo;
};

export default function TodoToggleButton({ todo }: TodoToggleButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: todo.text,
          completed: !todo.completed,
          date: todo.date,
        }),
      });

      if (!response.ok) {
        throw new Error("Todo status update failed.");
      }

      router.refresh();
    });
  }

  return (
    <button
      className="rounded-lg bg-[#e8f7ef] px-2 py-1.5 text-xs text-[#178a45] transition hover:bg-[#d9f0e3] disabled:opacity-50"
      disabled={isPending}
      onClick={handleToggle}
      type="button"
    >
      {todo.completed ? "진행" : "완료"}
    </button>
  );
}
