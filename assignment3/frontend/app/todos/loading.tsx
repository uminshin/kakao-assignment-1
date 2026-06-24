export default function TodosLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2f8] px-4 py-8 text-[#222]">
      <section className="w-full max-w-[400px] rounded-[18px] bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <p className="text-center text-[13px] font-bold text-[#777]">Todo 불러오는 중</p>
        <div className="mt-6 rounded-[14px] bg-[#f4f0ff] px-3 py-5">
          <div className="mx-auto h-4 w-2/3 rounded bg-[#e1d8ff]" />
          <div className="mx-auto mt-3 h-4 w-1/2 rounded bg-[#e1d8ff]" />
        </div>
      </section>
    </main>
  );
}
