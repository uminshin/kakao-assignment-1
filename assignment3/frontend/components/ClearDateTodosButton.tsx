"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type ClearDateTodosButtonProps = {
  todoIds: number[];
};

export default function ClearDateTodosButton({ todoIds }: ClearDateTodosButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClear() {
    startTransition(async () => {
      await Promise.all(
        todoIds.map((todoId) =>
          fetch(`/api/todos/${todoId}`, {
            method: "DELETE",
          }),
        ),
      );

      router.refresh();
    });
  }

  return (
    <button
      className="rounded-full bg-[#672be0] px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#541fb9] disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isPending || todoIds.length === 0}
      type="button"
      onClick={handleClear}
    >
      초기화
    </button>
  );
}
