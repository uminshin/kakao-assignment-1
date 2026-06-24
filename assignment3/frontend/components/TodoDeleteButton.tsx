"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type TodoDeleteButtonProps = {
  todoId: number;
};

export default function TodoDeleteButton({ todoId }: TodoDeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Todo delete failed.");
      }

      router.refresh();
    });
  }

  return (
    <button
      className="rounded-lg bg-[#ffe8e8] px-2 py-1.5 text-xs text-[#d93025] transition hover:bg-[#ffdada] disabled:opacity-50"
      disabled={isPending}
      onClick={handleDelete}
      type="button"
    >
      삭제
    </button>
  );
}
