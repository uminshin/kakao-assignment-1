import ClearDateTodosButton from "../../components/ClearDateTodosButton";
import DateNavigator from "../../components/DateNavigator";
import FilterTabs from "../../components/FilterTabs";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import { getDateKey, parseDateKey } from "../../utils/date";
import { createTodoAction, readTodosAction } from "../actions";

type TodosPageProps = {
  searchParams: Promise<{
    date?: string;
    filter?: string;
  }>;
};

function getSelectedFilter(filter?: string) {
  if (filter === "active" || filter === "completed") {
    return filter;
  }

  return "all";
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const params = await searchParams;
  const selectedDate = parseDateKey(params.date);
  const selectedDateKey = getDateKey(selectedDate);
  const selectedFilter = getSelectedFilter(params.filter);
  const todos = await readTodosAction();
  const selectedDateTodos = todos.filter((todo) => todo.date === selectedDateKey);
  const filteredTodos = selectedDateTodos.filter((todo) => {
    if (selectedFilter === "active") {
      return todo.completed === false;
    }

    if (selectedFilter === "completed") {
      return todo.completed === true;
    }

    return true;
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <h1 className="mb-6 text-center text-[28px] font-bold text-[#672be0]">
          Todo List
        </h1>

        <DateNavigator filter={selectedFilter} selectedDate={selectedDate} />

        <TodoForm
          action={createTodoAction}
          defaultDate={selectedDateKey}
          submitLabel="추가"
        />

        <p className="mt-2 min-h-5 text-[13px] text-[#e74c3c]" role="status" />

        <FilterTabs
          selectedDateKey={selectedDateKey}
          selectedFilter={selectedFilter}
        />

        <div className="mb-4 flex items-center justify-between px-1 py-1">
          <p className="text-[13px] font-bold text-[#555]">
            Todo {selectedDateTodos.length}개
          </p>
          <ClearDateTodosButton todoIds={selectedDateTodos.map((todo) => todo.id)} />
        </div>

        <TodoList selectedFilter={selectedFilter} todos={filteredTodos} />
      </section>
    </main>
  );
}
