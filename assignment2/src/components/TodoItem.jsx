import React, { useEffect, useState } from "react";

function TodoItem({
  isEditing,
  todo,
  onCancelEdit,
  onDeleteTodo,
  onEditTodo,
  onToggleTodo,
  onUpdateTodo,
}) {
  const [editText, setEditText] = useState(todo.text);

  // 수정 모드가 열릴 때 현재 Todo 내용을 항목 안의 입력창에 복사한다.
  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
    }
  }, [isEditing, todo.text]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateTodo(todo.id, editText);
  }

  return (
    <li className="flex items-center justify-between gap-2 border-b border-[#eee] py-3">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex min-w-0 flex-1 gap-1.5">
          <input
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-[#ddd] px-2 py-1.5 text-sm outline-none focus:border-[#672be0]"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#222] px-2 py-1.5 text-xs text-white"
          >
            저장
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg bg-[#f4f2f8] px-2 py-1.5 text-xs text-[#672be0]"
          >
            취소
          </button>
        </form>
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 break-words text-sm ${
              todo.completed ? "text-[#999] line-through" : "text-[#222]"
            }`}
          >
            {todo.text}
          </span>

          <div className="flex shrink-0 gap-[5px]">
            <button
              type="button"
              onClick={() => onEditTodo(todo.id)}
              className="rounded-lg bg-[#ede6ff] px-2 py-1.5 text-xs text-[#672be0]"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => onToggleTodo(todo.id)}
              className="rounded-lg bg-[#e8f7ef] px-2 py-1.5 text-xs text-[#178a45]"
            >
              {todo.completed ? "진행" : "완료"}
            </button>
            <button
              type="button"
              onClick={() => onDeleteTodo(todo.id)}
              className="rounded-lg bg-[#ffe8e8] px-2 py-1.5 text-xs text-[#d93025]"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
