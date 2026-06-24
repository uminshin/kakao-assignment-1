import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <p className="text-center text-[13px] font-bold text-[#777]">Assignment 3</p>
        <h1 className="mt-1 text-center text-[28px] font-bold text-[#672be0]">
          Todo List
        </h1>
        <p className="mt-4 text-center text-[13px] leading-6 text-[#666]">
          Next.js App Router와 FastAPI 백엔드를 연결해 Todo 앱을 다시 구현합니다.
        </p>
        <Link
          className="mt-6 flex w-full justify-center rounded-[10px] bg-[#672be0] px-4 py-3 text-sm font-bold text-white hover:bg-[#5421bd]"
          href="/todos"
        >
          Todo 목록으로 이동
        </Link>
      </section>
    </main>
  );
}
