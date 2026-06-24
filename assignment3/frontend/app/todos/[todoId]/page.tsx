import Link from "next/link";
import PageHeader from "../../../components/PageHeader";
import TodoForm from "../../../components/TodoForm";
import { readTodoAction, updateTodoAction } from "../../actions";

type EditTodoPageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { todoId } = await params;
  const todo = await readTodoAction(Number(todoId));
  const updateSelectedTodo = updateTodoAction.bind(null, todo.id);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <div className="mb-5">
          <Link
            className="text-[12px] font-bold text-[#777]"
            href={`/todos?date=${todo.date}`}
          >
            ← Todo 목록으로
          </Link>
        </div>

        <PageHeader
          eyebrow="Todo 수정"
          title="Todo 수정"
          description="선택한 Todo를 수정하고 서버에 저장합니다."
        />

        <TodoForm
          action={updateSelectedTodo}
          defaultCompleted={todo.completed}
          defaultDate={todo.date}
          defaultText={todo.text}
          showCompletedField
          submitLabel="저장"
        />
      </section>
    </main>
  );
}
