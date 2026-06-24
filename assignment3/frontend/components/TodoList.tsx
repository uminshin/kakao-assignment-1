import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

const EMPTY_MESSAGES: Record<string, string> = {
  all: "등록된 할 일이 없습니다.",
  active: "진행 중인 할 일이 없습니다.",
  completed: "완료한 할 일이 없습니다.",
};

type TodoListProps = {
  selectedFilter: string;
  todos: Todo[];
};

export default function TodoList({ selectedFilter, todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="py-5 text-center text-sm text-[#999]">
        {EMPTY_MESSAGES[selectedFilter] ?? EMPTY_MESSAGES.all}
      </p>
    );
  }

  return (
    <ul className="mt-3 list-none">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
