"use client";

type TodosErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TodosError({ error, reset }: TodosErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <p className="text-center text-[13px] font-bold text-[#d93025]">오류 발생</p>
        <h1 className="mt-2 text-center text-[24px] font-bold text-[#672be0]">
          Todo 화면을 불러오지 못했습니다
        </h1>
        <p className="mt-4 text-center text-[13px] leading-6 text-[#666]">
          {error.message}
        </p>
        <button
          className="mt-6 w-full rounded-[10px] bg-[#672be0] px-4 py-3 text-sm font-bold text-white hover:bg-[#5421bd]"
          onClick={reset}
          type="button"
        >
          다시 시도
        </button>
      </section>
    </main>
  );
}
