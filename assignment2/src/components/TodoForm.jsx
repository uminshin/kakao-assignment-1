import React, { useState } from "react";

function TodoForm({ onAddTodo }) {
  const [todoText, setTodoText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const isAdded = onAddTodo(todoText);

    if (isAdded) {
      setTodoText("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        placeholder="할 일을 입력하세요"
        className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-3 py-3 text-sm outline-none focus:border-[#672be0]"
      />

      <button
        type="submit"
        className="rounded-[10px] bg-[#672be0] px-3.5 py-3 text-sm font-bold text-white hover:bg-[#5421bd]"
      >
        추가
      </button>
    </form>
  );
}

export default TodoForm;
