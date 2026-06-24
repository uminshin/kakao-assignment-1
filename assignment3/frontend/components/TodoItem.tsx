import Link from "next/link";
import type { Todo } from "../types/todo";
import TodoDeleteButton from "./TodoDeleteButton";
import TodoToggleButton from "./TodoToggleButton";

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between gap-2 border-b border-[#eee] py-3 last:border-b-0">
      <span
        className={`min-w-0 flex-1 break-words text-sm ${
          todo.completed ? "text-[#999] line-through" : "text-[#222]"
        }`}
      >
        {todo.text}
      </span>

      <div className="flex shrink-0 gap-[5px]">
        <Link
          className="rounded-lg bg-[#ede6ff] px-2 py-1.5 text-xs text-[#672be0]"
          href={`/todos/${todo.id}`}
        >
          수정
        </Link>
        <TodoToggleButton todo={todo} />
        <TodoDeleteButton todoId={todo.id} />
      </div>
    </li>
  );
}
