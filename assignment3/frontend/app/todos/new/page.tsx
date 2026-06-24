import Link from "next/link";
import PageHeader from "../../../components/PageHeader";
import TodoForm from "../../../components/TodoForm";
import { getDateKey, parseDateKey } from "../../../utils/date";
import { createTodoAction } from "../../actions";

type NewTodoPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function NewTodoPage({ searchParams }: NewTodoPageProps) {
  const params = await searchParams;
  const selectedDateKey = getDateKey(parseDateKey(params.date));

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <div className="mb-5">
          <Link
            className="text-[12px] font-bold text-[#777]"
            href={`/todos?date=${selectedDateKey}`}
          >
            ← Todo 목록으로
          </Link>
        </div>

        <PageHeader
          eyebrow="Todo 생성"
          title="새 Todo"
          description="선택한 날짜에 저장할 Todo를 추가합니다."
        />

        <TodoForm
          action={createTodoAction}
          defaultDate={selectedDateKey}
          submitLabel="추가"
        />
      </section>
    </main>
  );
}
